import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SxProps } from '@mui/system';
import { Paper } from '@mui/material';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: "10px",
  width: '95%',
  maxHeight: "95vh",
  overflow: 'auto',
  boxShadow: 24,
  p: 4,
};

interface GenericModalProps {
  children: React.ReactNode | React.ReactNodeArray,
  open: boolean,
  ariaLabel: string,
  ariaDescription: string,
  sx?: SxProps,
  onClose: React.Dispatch<React.SetStateAction<boolean>>
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
        <Paper sx={{ ...style, ...sx }}>
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
}
