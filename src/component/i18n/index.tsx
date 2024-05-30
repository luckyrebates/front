import React, { useState, MouseEvent } from 'react';
import { Button, Box, Menu, MenuItem } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import i18n from 'i18next';
import crc32 from 'crc/crc32';
import { LANGUAGE_MAP, LANGUAGE } from './init';

export const t = (key: string, params?: any): string => {
  const hashKey = `K_${crc32(key).toString(16)}`;
  let words = i18n.t(hashKey, params);

  if (words === hashKey) {
    words = key;
  }

  return words as string;
};

export function Language() {
  // const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguageHandle = (language: LANGUAGE) => {
    i18n.changeLanguage(language);
    handleClose();
    window.location.reload();
  };

  const LANGUAGE_BUTTON_ID = 'r_id_language-button';
  const LANGUAGE_MENU_ID = 'r_id_language-menu';

  return (
    <Box>
      <Button
        variant="text"
        id={LANGUAGE_BUTTON_ID}
        aria-controls={open ? LANGUAGE_MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <LanguageOutlinedIcon />
        {i18n.language}
      </Button>
      <Menu
        id={LANGUAGE_MENU_ID}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': LANGUAGE_BUTTON_ID,
        }}
      >
        {Object.keys(LANGUAGE_MAP).map((language) => (
          <MenuItem
            key={language}
            onClick={() => {
              changeLanguageHandle(language as LANGUAGE);
            }}
          >
            {LANGUAGE_MAP[language as LANGUAGE].label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
