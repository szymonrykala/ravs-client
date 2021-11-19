import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SxProps } from '@mui/system';
import { Paper } from '@mui/material';


interface GenericModalProps {
  children: React.ReactNode | React.ReactNodeArray,
  open: boolean,
  sx?: SxProps,
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GenericModal({
  children, open, sx, onClose
}: GenericModalProps) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'auto'
      }}
    >
      <Fade in={open}>
        <Paper sx={{
          bgcolor: 'background.paper',
          position: 'absolute' as 'absolute',
          borderRadius: (theme) => theme.shape.borderRadius,
          width: '95%',
          mt: '10vw',
          maxWidth: '500px',
          // overflow: 'auto',
          boxShadow: 24,
          p: 3,
          ...sx
        }}>
          {children}
        </Paper>
      </Fade>
    </Modal >
  );
}
