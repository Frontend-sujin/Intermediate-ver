import styled from 'styled-components';
import Portal from '../Portal/Portal';
import { useState } from 'react';
import loadingImg from '../../assets/loading.gif';
import { createRoot } from 'react-dom/client';

/* ------------------ Modal Props Type ------------------ */
export interface Props {
   isOpened: boolean;

   /* 확인 버튼 */
   hasOkButton?: boolean;
   onOk?: () => void;
   okText?: string | JSX.Element;

   /* 취소 버튼 */
   hasCancelButton?: boolean;
   onCancel?: () => void;
   cancelText?: string | JSX.Element;

   /* 확인 버튼 클릭 시 로딩 타이머 (단위: 초) */
   confirmLoadingSeconds?: number;

   /* 제목 */
   title?: string;

   /* 내부 콘텐츠 */
   children: string | JSX.Element;
}

/* ------------------ Modal ------------------ */
const Modal = ({
   isOpened = false,
   hasOkButton = true,
   onOk = () => {},
   okText = '확인',
   hasCancelButton = true,
   onCancel = () => {},
   cancelText = '취소',
   confirmLoadingSeconds,
   title,
   children,
}: Props) => {
   const [isLoading, setIsLoading] = useState(false);

   const onConfirmLoading = () => {
      setIsLoading(true);

      if (confirmLoadingSeconds) {
         setTimeout(() => {
            setIsLoading(false);
            onOk();
         }, confirmLoadingSeconds * 1000);
      }
   };

   if (!isOpened) return null;

   return (
      <Portal>
         <StyledWrapper onClick={onCancel}>
            <div
               className="wrapper"
               onClick={e => e.stopPropagation()}
            >
               <div className="title">{title}</div>
               <div className="contents">{children}</div>
               <div className="footer">
                  {hasCancelButton && (
                     <button onClick={onCancel}>
                        {cancelText}
                     </button>
                  )}
                  {hasOkButton && (
                     <button
                        onClick={
                           confirmLoadingSeconds
                              ? onConfirmLoading
                              : onOk
                        }
                        disabled={isLoading}
                     >
                        {isLoading && (
                           <img
                              className="loading-img"
                              src={loadingImg}
                              alt="loading-img"
                           />
                        )}
                        {okText}
                     </button>
                  )}
               </div>
            </div>
         </StyledWrapper>
      </Portal>
   );
};

/* ------------------ Modal Methods ------------------ */
/* Methods Type: confirm, warning, error */
Modal.confirm = (props: Props) => {
   props = {
      ...props,
      title: 'Confirm!',
   };
   showModal(props);
};

Modal.warning = (props: Props) => {
   props = {
      ...props,
      title: 'Warning!',
   };
   showModal(props);
};

Modal.error = (props: Props) => {
   props = {
      ...props,
      title: 'Error!',
   };
   showModal(props);
};

export default Modal;

/* ------------------ Modules ------------------ */
const showModal = (props: Props) => {
   const container = createContainerDom();
   const root = createRoot(container);

   return root.render(
      <Modal
         {...props}
         onOk={() => {
            props.onOk?.();
            root.unmount();
         }}
         onCancel={() => {
            props.onCancel?.();
            root.unmount();
         }}
      />,
   );
};

const createContainerDom = () => {
   const container = document.createElement('div');
   container.id = `portal_${Math.random()
      .toString(36)
      .substring(2, 11)}`;
   document.body.appendChild(container);

   return container;
};

/* ------------------ Modal Styles ------------------ */
const StyledWrapper = styled.div`
   position: fixed;
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;

   .wrapper {
      position: relative;
      width: 500px;
      height: 200px;
      background-color: white;
      color: black;
      padding: 20px;
      display: flex;
      flex-direction: column;

      .title {
         font-size: 21px;
         font-weight: 600;
         padding: 10px;
      }

      .contents {
         margin-bottom: 20px;
         padding: 10px;
         font-size: 18px;
      }

      .footer {
         position: absolute;
         bottom: 20px;
         left: 0;
         width: 100%;
         margin: 0 auto;
         display: flex;
         justify-content: center;
         gap: 30px;

         button {
            display: flex;
            align-items: center;
         }
      }
   }

   .loading-img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
   }
`;
