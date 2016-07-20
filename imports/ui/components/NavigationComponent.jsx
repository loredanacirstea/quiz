import React from 'react';
import { Link } from 'react-router';

const NavigationButton = React.createClass({
  propTypes: {
    status: React.PropTypes.string,
    link: React.PropTypes.string,
    icon: React.PropTypes.string,
  },

  render() {
    const { status, link, icon } = this.props;
    return (
      <Link className={ `${ status } item` } to={ link }>
        <i className={ `ui ${ icon } icon` }></i>
      </Link>
    );
  }
});

const NavigationComponent = React.createClass({
  propTypes: {
    no: React.PropTypes.number,
    maxNo: React.PropTypes.number,
  },

  render() {
    const { no, maxNo } = this.props;
    const back = (
      <NavigationButton 
        status={ no > 1 ? '' : 'disabled' }
        link={ `/${ no > 1 ? (no-1) : no}` }
        icon="chevron left"
      />
    );
    const next = (
      <NavigationButton 
        status={ no < maxNo ? '' : 'disabled' }
        link={ `/${ no < maxNo ? (no+1) : no }` }
        icon="chevron right"
      />
    );
    const pages = [...Array(maxNo).keys()].map(page => {
      const status = no == page+1 ? 'active' : '';
      return (
        <Link key={ `page_${page+1}` } to={ `/${page+1}` }>
          <div className={ `${ status } item` }>
            { page+1 }
          </div>
        </Link>
      );
    });

    return (
      <div className="ui pagination menu isolated">
        { back }
        { pages }
        { next }
      </div>
    );
  }
});

export default NavigationComponent;