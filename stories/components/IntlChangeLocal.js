import React from 'react';
import Button from '@material-ui/core/Button';
import withIntlControlProvider from '@e-group/material/IntlControlProvider/withIntlControlProvider';

const IntlChangeLocal = ({ setLocale, locale }) => {
  return (
    <Button
      onClick={() => {
        if (locale === 'zh-tw') {
          setLocale('en');
        } else {
          setLocale('zh-tw');
        }
      }}
    >
      toggle locale
    </Button>
  );
};

export default withIntlControlProvider(IntlChangeLocal);
