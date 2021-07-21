import { h, Component, Fragment } from 'preact';

/** @extends Component<{ getFile: () => Promise<File> }, { inProgress: boolean }> */
export class CaptureButton extends Component {
  state = { inProgress: false };

  handleCapture = async () => {
    this.setState({ inProgress: true });
    let file = await this.props.getFile();
    let url = URL.createObjectURL(file);
    Object.assign(document.createElement('a'), {
      download: file.name,
      href: url
    }).click();
    URL.revokeObjectURL(url);
    this.setState({ inProgress: false });
  };

  render() {
    return h(
      Fragment,
      null,
      h('input', {
        type: 'button',
        id: 'capture',
        class:
          'pure-button' + (this.state.inProgress ? ' pure-button-active' : ''),
        onclick: this.handleCapture,
        value: `${this.state.inProgress ? '⌛' : '📷'} Capture image`
      })
    );
  }
}
