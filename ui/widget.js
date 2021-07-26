import { h, Component, createRef } from 'preact';

/** @typedef {import('../libapi.mjs').Config} Config */

/**
 * @param {Config} config
 */
function getValueForComparison(config) {
  if (config.type === 'window' || config.type === 'section') {
    // compare instances themselves
    return config;
  }
  return config.value;
}

/**
 *
 * @extends Component<{ config: Config, setValue: (name: string, value: any) => Promise<void> }>
 */
export class Widget extends Component {
  state = { inProgress: false };

  shouldComponentUpdate(
    /** @type {Widget['props']} */ nextProps,
    /** @type {Widget['state']} */ nextState
  ) {
    if (this.state.inProgress && nextState.inProgress) {
      return false;
    }
    if (this.state.inProgress || nextState.inProgress) {
      return true;
    }
    let prevConfig = this.props.config;
    let { config } = nextProps;
    if (config.type === 'toggle' && config.value === undefined) {
      return false;
    }
    return (
      getValueForComparison(config) !== getValueForComparison(prevConfig) ||
      config.readonly !== prevConfig.readonly
    );
  }

  getValueProp(out = false) {
    switch (this.props.config.type) {
      case 'toggle':
        return 'checked';
      case 'datetime':
        return 'valueAsNumber';
      case 'range':
        // Apparently can't render with `valueAsNumber` as preact property,
        // but can retrieve it back.
        return out ? 'valueAsNumber' : 'value';
      default:
        return 'value';
    }
  }

  handleChange = async e => {
    this.setState({ inProgress: true });
    try {
      await this.props.setValue(
        this.props.config.name,
        e.target[this.getValueProp(true)]
      );
    } finally {
      this.setState({ inProgress: false });
    }
  };

  render(
    /** @type {Widget['props']} */ { config, setValue },
    /** @type {Widget['state']} */ { inProgress }
  ) {
    let { label, name } = config;
    let id = `config-${name}`;
    if (config.type === 'window' || config.type === 'section') {
      let children = Object.values(config.children);
      if (!children.length) return;
      return h(
        'fieldset',
        { id },
        h('legend', {}, label),
        children.map(config =>
          h(Widget, { key: config.name, config, setValue })
        )
      );
    }
    let { value, readonly } = config;
    let valueProp = this.getValueProp();
    let attrs = {
      id,
      [valueProp]: value,
      readonly: readonly || inProgress,
      onChange: this.handleChange
    };
    let inputElem;
    switch (config.type) {
      case 'range': {
        let { min, max, step } = config;
        inputElem = h(EditableInput, {
          type: 'number',
          min,
          max,
          step,
          ...attrs
        });
        break;
      }
      case 'text':
        inputElem = readonly ? value : h(EditableInput, attrs);
        break;
      case 'toggle': {
        inputElem = h('input', {
          type: 'checkbox',
          ...attrs
        });
        break;
      }
      case 'menu':
      case 'radio': {
        let { choices } = config;
        inputElem = h(
          'select',
          attrs,
          choices.map(choice =>
            h(Option, {
              key: choice,
              value: choice,
              disabled: attrs.readonly && value !== choice
            })
          )
        );
        break;
      }
      case 'datetime': {
        inputElem = h(EditableInput, {
          type: 'datetime-local',
          ...attrs
        });
        break;
      }
      default: {
        inputElem = '(unimplemented)';
        break;
      }
    }
    return h(
      'div',
      { class: 'pure-control-group' },
      h('label', { for: id }, (inProgress ? '⌛ ' : '') + label),
      inputElem
    );
  }
}

/**
 * Special memoized option to work around https://github.com/preactjs/preact/issues/3171.
 * @extends Component<{ value: string, disabled?: boolean }>
 */
class Option extends Component {
  shouldComponentUpdate(/** @type {Option['props']} */ nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return h('option', this.props, this.props.value);
  }
}

/**
 * Wrapper around <input /> that doesn't update it while it's in focus to allow editing.
 */
class EditableInput extends Component {
  ref = createRef();

  shouldComponentUpdate() {
    return document.activeElement !== this.ref.current;
  }

  render(props) {
    return h('input', Object.assign(props, { ref: this.ref }));
  }
}
