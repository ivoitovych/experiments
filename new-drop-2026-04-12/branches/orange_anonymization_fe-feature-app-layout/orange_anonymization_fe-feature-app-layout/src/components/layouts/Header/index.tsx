import { Box, Typography, Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { LAYOUT } from '@/theme';
import { useHeader } from '@/components/layouts/Header/useHeader';
import type { HeaderProps } from '@/components/layouts/Header/useHeader';

export type { HeaderProps };

const Header = ({ userEmail }: HeaderProps) => {
  const { title, subtitle } = useHeader(userEmail);

  return (
    <Box
      component="header"
      sx={(theme) => ({
        height: LAYOUT.header.height,
        pt: `${LAYOUT.header.paddingTop}px`,
        pr: `${LAYOUT.header.paddingRight}px`,
        pb: `${LAYOUT.header.paddingBottom}px`,
        pl: `${LAYOUT.header.paddingLeft}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box>
        <Typography
          variant="h5"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.text.secondary,
          })}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={(theme) => ({
            width: LAYOUT.header.avatarSize,
            height: LAYOUT.header.avatarSize,
            bgcolor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.text.primary}`,
          })}
        >
          <AccountCircleOutlinedIcon
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontSize: LAYOUT.header.avatarIconSize,
            })}
          />
        </Avatar>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightMedium,
          })}
        >
          {userEmail}
        </Typography>
      </Box>
    </Box>
  );
};

export { Header };
