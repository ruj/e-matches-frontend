import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import ReactModal from 'react-modal'

import Button from './Button'


export default function Modal ({ options, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        color={options.button.color}
        value={options.button.value}
        onClick={toggleModal}
      />
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        // onAfterOpen={}
        onRequestClose={toggleModal}
        className="w-4/5 xl:w-2/4 2xl:w-1/4 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900"
        overlayClassName="modal-overlay"
      >
        <div>
          <div className="grid grid-cols-11 bg-zinc-800/50">
            <div className="h-10 flex justify-center items-center col-start-1 col-end-11">
              <h2 className="text-lg font-black">{options.title}</h2>
            </div>
            <button
              className="flex justify-center items-center col-start-11 bg-red-600/10 hover:bg-red-600/75 cursor-pointer"
              onClick={toggleModal}
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="p-8 bg-zinc-800/10">{children}</div>
        </div>
      </ReactModal>
    </>
  )
}
