import { useState } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';

type ModalType = 'confirm' | 'warning' | 'error';
const modalTypes: ModalType[] = [
   'confirm',
   'warning',
   'error',
];

function App() {
   const [isModalOpened, setIsModalOpened] =
      useState(false);

   const showModal = (type: ModalType) => {
      Modal[`${type}`]({
         isOpened: true,
         children: (
            <>
               안녕하세요. {`${type}`} 메서드로 호출한
               모달입니다.
            </>
         ),
      });
   };

   return (
      <>
         <button onClick={() => setIsModalOpened(true)}>
            모달 열기
         </button>
         <Modal
            isOpened={isModalOpened}
            onOk={() => setIsModalOpened(false)}
            onCancel={() => setIsModalOpened(false)}
            confirmLoadingSeconds={2}
         >
            안녕하세요. 모달입니다.
         </Modal>
         <div
            style={{
               display: 'flex',
               gap: '5px',
               marginTop: '10px',
            }}
         >
            {modalTypes.map(type => {
               return (
                  <button onClick={() => showModal(type)}>
                     {type}
                  </button>
               );
            })}
         </div>
      </>
   );
}

// chat gpt 참고해서 confirm 메서드 만들어보기

export default App;
