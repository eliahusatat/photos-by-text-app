import Card from "../Card/Card";
import "./CardList.css"
import {useContext, useState , useRef , useCallback} from "react";
import {StoreContext} from "../../stores/StoreProvider";
import STRINGS from "../../constants/strings";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CardList ({list }) {
    const store = useContext(StoreContext);
    const [open,setOpen] = useState(false)
    // const [modalShown, toggleModal] = useState(false);
    const myRef = useRef(null)
    // this hook to run when the last photo is render according to : https://www.youtube.com/watch?v=NZKUirTtxcg
    const lastPhoto = useCallback(node => {
        if(store.isLoading || !store.hasMore)  return;
        if(myRef.current) myRef.current.disconnect()
        myRef.current = new IntersectionObserver( entries => {
              if(entries[0].isIntersecting && store.hasMore){
                  store.setData('pageNumber',store.pageNumber + 1)
              }
        })
        if(node) myRef.current.observe(node)
        // eslint-disable-next-line
    }, [store.isLoading ,store.hasMore])
    const [selectedCard,setSelectedCard] = useState( {})
    const openModal = _ => {
        setOpen(true)
    }
    // const onCloseModal = () =>{
    //     setOpen(false)
    // }
    const onClickCard = (photo) => {
        setSelectedCard(photo)
        openModal()
    }

    const cells = list.map((obj,index) => {
            if (list.length === index + 1) {
               return <div className="item" key={index}>
                    {<Card innerRef={ lastPhoto } photo={obj} onClickCard={() => (onClickCard(obj))}/>}
                </div>
            } else {
                return  <div className="item" key={index}>
                    {<Card photo={obj} onClickCard={() => (onClickCard(obj))}/>}
                </div>
            }
        }
    )
    return (
        <div>
            {store.lastQuery !== '' && store.photos.length > 0 &&<div className="result-text">{STRINGS.RESULT_FOR + store.lastQuery}</div>}
            <Modal
                shown={open}
                close={() => {
                    setOpen(false);
                }}
                children={<Card photo={selectedCard} size={'medium'}/>}
            >

            </Modal>
        <div className="list-container">
            {cells}
        </div>
            {store.isLoading && <LoadingSpinner />}
            {store.lastQuery !== '' && store.photos.length > 0 && !store.hasMore&&<div className="result-text">{STRINGS.RESULT_END}</div>}
        </div>
    )
}
