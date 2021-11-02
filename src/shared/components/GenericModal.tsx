import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SxProps } from '@mui/system';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: "10px",
  minWidth: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface GenericModalProps {
  children: React.ReactNode | React.ReactNodeArray,
  open: boolean,
  ariaLabel: string,
  ariaDescription: string,
  sx?: SxProps,
  onClose: () => void
}

export default function GenericModal({
  children, open, ariaLabel, ariaDescription, sx, onClose
}: GenericModalProps) {

  return (
    <Modal
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...style, ...sx }}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
