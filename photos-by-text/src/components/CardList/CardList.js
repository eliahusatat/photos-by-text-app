//component
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//style
import "./CardList.css"
//hooks
import {useContext, useState , useRef , useCallback} from "react";
//store
import {StoreContext} from "../../stores/StoreProvider";
import {observer} from "mobx-react";
//constants
import STRINGS from "../../constants/strings";


function CardList ({list }) {
    const store = useContext(StoreContext);
    const [open,setOpen] = useState(false)
    const [selectedCard,setSelectedCard] = useState( {})
    const openModal = () => {
        setOpen(true)
    }
    // open the img in medium size on the modal
    const onClickCard = (photo) => {
        setSelectedCard(photo)
        openModal()
    }
    const myRef = useRef(null)

    // this hook to run when the last photo is render according to : https://www.youtube.com/watch?v=NZKUirTtxcg
    const lastPhoto = useCallback(node => {
        if(store.isLoading || !store.hasMore)  return;
        if(myRef.current) myRef.current.disconnect()
        myRef.current = new IntersectionObserver( entries => {
              if(entries[0].isIntersecting && store.hasMore){ // if the ref was render to the screen and we have more photos for this query - get the next page
                  store.setData('pageNumber',store.pageNumber + 1)
              }
        })
        if(node) myRef.current.observe(node)
        // eslint-disable-next-line
    }, [store.isLoading ,store.hasMore])

    const cells = list.map((obj,index) => {
            // give the last card ref - so we knew when its render to the page - for the infinite scroll
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
            {store.lastQuery !== '' && store.photosCount > 0 &&<div className="result-text">{STRINGS.RESULT_FOR + store.lastQuery}</div>}
                {store.lastQuery !== '' && store.photosCount === 0 && !store.isLoading &&<div className="result-text">{STRINGS.NO_RESULT1 + store.lastQuery+ STRINGS.NO_RESULT2}</div>}
            <Modal
                shown={open}
                close={() => {setOpen(false);}}
                children={<Card photo={selectedCard} size={'medium'}/>}>
            </Modal>
        <div className="list-container">
            {cells}
        </div>
            {store.isLoading && <LoadingSpinner />}
            {store.lastQuery !== '' && store.photos.length > 0 && !store.hasMore&&<div className="result-text">{STRINGS.RESULT_END}</div>}
        </div>
    )
}

export default observer(CardList)
