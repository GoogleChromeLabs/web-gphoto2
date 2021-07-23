import { h, Component, Fragment } from 'preact';

/** @extends Component<{ getFile: () => Promise<File> }, { status: string }> */
export class CaptureButton extends Component {
  state = { status: '📷' };

  handleCapture = async () => {
    this.setState({ status: '⌛' });
    try {
      let file = await this.props.getFile();
      let url = URL.createObjectURL(file);
      Object.assign(document.createElement('a'), {
        download: file.name,
        href: url
      }).click();
      URL.revokeObjectURL(url);
      this.setState({ status: '📷' });
    } catch (err) {
      console.error(err);
      this.setState({ status: '❌' });
    }
  };

  render() {
    return h(
      Fragment,
      null,
      h('input', {
        type: 'button',
        id: 'capture',
        disabled: this.state.status !== '📷',
        class: 'pure-button',
        onclick: this.handleCapture,
        value: `${this.state.status} Capture image`
      })
    );
  }
}
