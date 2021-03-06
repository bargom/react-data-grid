const React         = require('react');
const PropTypes     = React.PropTypes;

const Draggable = React.createClass({
  propTypes: {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrag: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor])
  },

  getDefaultProps() {
    return {
      onDragStart: () => true,
      onDragEnd: () => {},
      onDrag: () => {}
    };
  },

  getInitialState(): {drag: ?any} {
    return {
      drag: null
    };
  },

  componentWillUnmount() {
    this.cleanUp();
  },

  onMouseDown(e: SyntheticMouseEvent) {
    let drag = this.props.onDragStart(e);

    if (drag === null && e.button !== 0) {
      return;
    }

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);

    this.setState({drag});
  },

  onMouseMove(e: SyntheticEvent) {
    if (this.state.drag === null) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    this.props.onDrag(e);
  },

  onMouseUp(e: SyntheticEvent) {
    this.cleanUp();
    this.props.onDragEnd(e, this.state.drag);
    this.setState({drag: null});
  },

  cleanUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  },

  render(): ?ReactElement {
    return (
      <div {...this.props}
        onMouseDown={this.onMouseDown}
        className="react-grid-HeaderCell__draggable" />
    );
  }
});

module.exports = Draggable;
