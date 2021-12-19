import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { SxProps } from '@mui/system';
import { Paper } from '@mui/material';


interface GenericModalProps {
  children: React.ReactNode | React.ReactNode[],
  open: boolean,
  sx?: SxProps,
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

function GenericModal({
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
          position: 'absolute',
          width: '95%',
          mt: '5vw',
          maxWidth: '500px',
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

export default React.memo(GenericModal);