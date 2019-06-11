import React from 'react';
import PropTypes from 'prop-types';
import { matchRoutes } from 'react-router-config';
import { Link } from 'react-router';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

const Breadcrumbs = ({
  routes,
  pathname,
  MuiTypographyProps,
  MuiLinkProps,
  ...other
}) => {
  const matchedRoutes = matchRoutes(routes, pathname);
  return (
    <MuiBreadcrumbs {...other}>
      {matchedRoutes.map((matchRoute, i) => {
        const { breadcrumbName } = matchRoute.route;
        const { url } = matchRoute.match;
        // last item
        if (i + 1 === matchedRoutes.length) {
          return (
            <Typography key={`breadcrumb-link-${i}`} {...MuiTypographyProps}>
              {breadcrumbName}
            </Typography>
          );
        }
        return (
          <MuiLink
            component={Link}
            to={url}
            key={`breadcrumb-link-${i}`}
            {...MuiLinkProps}
          >
            {breadcrumbName}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  /**
   * The parameter of `matchRoutes`
   */
  routes: PropTypes.array.isRequired,
  /**
   * The parameter of `matchRoutes`
   */
  pathname: PropTypes.string.isRequired,
  /**
   * Mui `Typography` porps
   */
  MuiTypographyProps: PropTypes.object,
  /**
   * Mui `Link` porps
   */
  MuiLinkProps: PropTypes.object
};

export default Breadcrumbs;
