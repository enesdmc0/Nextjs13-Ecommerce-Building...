"use client"
import { useStoreModal } from '@/hooks/use-store-modal'
import React from 'react'
import { Modal } from '../ui/modal';

const StoreModal = () => {
    const storeModal = useStoreModal();

  return (
    <Modal 
    title='Create Store'
    description='Add a new store manage products and categories'
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
        Future Create Store Form
    </Modal>
  )
}

export default StoreModal