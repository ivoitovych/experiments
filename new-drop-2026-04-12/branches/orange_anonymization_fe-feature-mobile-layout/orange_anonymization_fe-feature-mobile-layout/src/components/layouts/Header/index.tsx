import { Box, Typography, Avatar, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { LAYOUT } from '@/theme';
import { useHeader } from '@/components/layouts/Header/useHeader';

export interface HeaderProps {
  userEmail: string;
  isMobile: boolean;
  onMenuOpen: () => void;
}

const Header = ({ userEmail, isMobile, onMenuOpen }: HeaderProps) => {
  const { title, subtitle } = useHeader(userEmail);

  return (
    <Box
      component="header"
      sx={(theme) => ({
        height: isMobile ? LAYOUT.header.mobileHeight : LAYOUT.header.height,
        px: isMobile ? `${LAYOUT.header.mobilePaddingX}px` : undefined,
        py: isMobile ? `${LAYOUT.header.mobilePaddingY}px` : undefined,
        pt: isMobile ? undefined : `${LAYOUT.header.paddingTop}px`,
        pr: isMobile ? undefined : `${LAYOUT.header.paddingRight}px`,
        pb: isMobile ? undefined : `${LAYOUT.header.paddingBottom}px`,
        pl: isMobile ? undefined : `${LAYOUT.header.paddingLeft}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuOpen}
            aria-label={title}
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <MenuIcon sx={{ fontSize: LAYOUT.header.menuIconSize }} />
          </IconButton>
        )}
        <Box>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            {title}
          </Typography>
          {!isMobile && (
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.text.secondary,
              })}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
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
        {!isMobile && (
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightMedium,
            })}
          >
            {userEmail}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export { Header };
