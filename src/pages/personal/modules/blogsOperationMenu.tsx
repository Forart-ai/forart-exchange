import CustomizeButton from '../../../contexts/theme/components/Button'
import React from 'react'
import {
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon, ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SvgIcon
} from '@mui/material'
import Button from '@mui/material/Button'
import { Ban_Outline, Dots_Horizontal, Flag_Checkered } from '../../../contexts/svgIcons'
import { ContentCopy, Flag } from '@mui/icons-material'

const BlogsOperationMenu:React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() =>   setOpen(prevOpen => !prevOpen)}
      >
        <SvgIcon>
          <Dots_Horizontal />
        </SvgIcon>
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon >
                      <SvgIcon fontSize={'small'}>
                        <Flag_Checkered />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText>Report Post</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon >
                      <SvgIcon fontSize={'small'}>
                        <Ban_Outline />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText>Block this post</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default BlogsOperationMenu
