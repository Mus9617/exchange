import React, { useState } from 'react'

import { Box, Modal } from '@mui/material'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import { CryptoProps } from '@/Utils/type'

type ModalUpdateProps = {
    CryptoProps: CryptoProps
  setIsReloadNeeded: any
}

export const ModalComponent = ({
  CryptoProps,
 
}: ModalUpdateProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '20%',
    transform: 'translate(-50%, -50%)',
    width: '60%',

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    // <div className="h-full  overflow-scroll">
     
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span
            className="absolute right-10 top-10 cursor-pointer"
            onClick={handleClose}
          >
            <IoIosCloseCircleOutline color="#000" size={48} />
          </span>
        </Box>
      </Modal> */}
  //   </div>
   )
}