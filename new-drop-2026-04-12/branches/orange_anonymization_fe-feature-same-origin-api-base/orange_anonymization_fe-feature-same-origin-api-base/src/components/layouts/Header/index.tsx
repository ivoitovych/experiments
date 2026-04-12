import { Box, Typography, Avatar, IconButton, useMediaQuery } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { LAYOUT } from '@/theme';
import { useHeader } from '@/components/layouts/Header/useHeader';

export interface HeaderProps {
  userEmail: string;
  isMobile: boolean;
  onMenuOpen: () => void;
}

const COMPACT_HEADER_HEIGHT = 48;

const Header = ({ userEmail, isMobile, onMenuOpen }: HeaderProps) => {
  const { title, subtitle } = useHeader(userEmail);
  const isLandscapePhone = useMediaQuery('(orientation: landscape) and (max-height: 600px)');
  const isCompact = isMobile && isLandscapePhone;

  return (
    <Box
      component="header"
      sx={(theme) => ({
        height: isCompact
          ? COMPACT_HEADER_HEIGHT
          : isMobile
            ? LAYOUT.header.mobileHeight
            : LAYOUT.header.height,
        px: isMobile ? `${LAYOUT.header.mobilePaddingX}px` : undefined,
        py: isMobile ? (isCompact ? '6px' : `${LAYOUT.header.mobilePaddingY}px`) : undefined,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: isCompact ? 1 : 1.5, minWidth: 0 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuOpen}
            aria-label={title}
            size={isCompact ? 'small' : 'medium'}
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <MenuIcon sx={{ fontSize: isCompact ? 22 : LAYOUT.header.menuIconSize }} />
          </IconButton>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            noWrap
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: isCompact ? '0.875rem' : undefined,
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
            width: isCompact ? 28 : LAYOUT.header.avatarSize,
            height: isCompact ? 28 : LAYOUT.header.avatarSize,
            bgcolor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.text.primary}`,
          })}
        >
          <AccountCircleOutlinedIcon
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontSize: isCompact ? 24 : LAYOUT.header.avatarIconSize,
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
