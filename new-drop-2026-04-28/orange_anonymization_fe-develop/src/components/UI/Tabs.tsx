import React, { useMemo, type ReactNode } from 'react';
import { Box, Tabs as MuiTabs, Tab as MuiTab, alpha } from '@mui/material';
import { FONT_SIZES } from '@/constants';

export interface ITab {
  name: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface ITabs {
  active: string;
  setActive: (active: string) => void;
  children: ReactNode;
  tabWrapperClassName?: string;
}

export function Tab(props: ITab) {
  return <Box sx={{ height: '100%' }}>{props.children}</Box>;
}

const Tabs = (props: ITabs) => {
  const tabs = useMemo(
    () => (Array.isArray(props.children) ? props.children : [props.children]),
    [props.children],
  );

  const activeTabContent = useMemo(
    () => tabs.find((tab) => tab?.props?.name === props.active),
    [props.active, tabs],
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    props.setActive(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'inline-flex',
          backgroundColor: 'neutral.100',
          borderRadius: '12px',
          p: '4px',
          mb: 3,
        }}
      >
        <MuiTabs
          value={props.active}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { display: 'none' },
          }}
          sx={{
            minHeight: 'auto',
            '& .MuiTabs-flexContainer': {
              gap: '4px',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: FONT_SIZES.sm,
              minHeight: '40px',
              px: 3,
              py: 1,
              borderRadius: '8px',
              color: 'neutral.400',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              '&.Mui-selected': {
                color: 'neutral.900',
                backgroundColor: 'common.white',
                boxShadow: (theme) => `0px 2px 6px ${alpha(theme.palette.common.black, 0.06)}`,
              },
              '&:hover:not(.Mui-selected)': {
                color: 'neutral.400',
                backgroundColor: 'neutral.200',
              },
            },
          }}
        >
          {tabs.map((tab) => (
            <MuiTab
              key={tab?.props?.name}
              label={tab?.props?.name}
              value={tab?.props?.name}
              disabled={tab?.props?.disabled}
              icon={tab?.props?.icon}
              iconPosition="start"
            />
          ))}
        </MuiTabs>
      </Box>

      <Box className={props.tabWrapperClassName} sx={{ height: '100%' }}>
        {activeTabContent}
      </Box>
    </Box>
  );
};

export default Tabs;
