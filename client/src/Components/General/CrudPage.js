import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ForwardBackButton from '../Admin/Menu/ForwardBackButton/ForwardBackButton';

export default function CrudPage({
  formPath,
  items,
  listPath,
  pathName,
  renderForm,
  renderList,
  showAdd,
  style,
  title,
  ...rest
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div {...rest}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          { (pathName === listPath && !showAdd) ? null : (
            <ForwardBackButton
              home={listPath}
              to={formPath}
              onForward={() => setSelectedItem(null)}
              pathname={pathName}
              homeIcon={AddIcon}
              toIcon={ArrowBackIcon}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Route
        exact
        path={listPath}
        render={() => renderList(items, setSelectedItem)}
      />
      <Route
        path={formPath}
        render={() => renderForm(items[selectedItem])}
      />
    </div>
  );
}

CrudPage.propTypes = {
  /** Path to display the form at. */
  formPath: PropTypes.string.isRequired,
  /** Items to populate the list with */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Path to display the list of items at */
  listPath: PropTypes.string.isRequired,
  /** Function to render the form when at form path.
   * This function will be passed the selected item
   * if an item is selected. Otherwise an empty object. */
  renderForm: PropTypes.func.isRequired,
  /** Function to render the list when at list path.
   * Will be passed items and a function that sets the
   * pages selected item. */
  renderList: PropTypes.func.isRequired,
  /** If true, the add button will be shown when at
   * list page. */
  showAdd: PropTypes.bool,
  /** Style of the page */
  style: PropTypes.objectOf(PropTypes.object),
  /** Title to show at top of page */
  title: PropTypes.string,
  /** Current browser location path. */
  pathName: PropTypes.string.isRequired,
};
CrudPage.defaultProps = {
  showAdd: true,
  style: {},
  title: '',
};
