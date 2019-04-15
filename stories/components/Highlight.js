import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import hljs from 'highlight.js';

import 'highlight.js/styles/github.css';

const styles = theme => ({
  code: {
    display: 'block',
    padding: '.5em',
    overflowX: 'auto',
    background: '#f8f8f8'
  }
});

class Highlight extends React.Component {
  _highlightCode = code => hljs.highlightAuto(code).value;

  render() {
    const { classes, code, type } = this.props;
    return (
      <pre>
        <code
          className={classNames(type, classes.code)}
          dangerouslySetInnerHTML={{ __html: this._highlightCode(code) }}
        />
      </pre>
    );
  }
}

Highlight.propTypes = {
  classes: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default withStyles(styles)(Highlight);
