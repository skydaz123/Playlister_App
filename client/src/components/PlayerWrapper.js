import { GlobalStoreContext } from "../store";
import YouTubePlayerExample from "./Player";
import CommentsSection from "./CommentSection";
import { useContext } from 'react'

const PlayerWrapper = () => {
    const { store } = useContext(GlobalStoreContext);
    console.log("PLAYER IS " + store.openPlayer);
    if (store.openPlayer === true){
        return <YouTubePlayerExample selectedList={store.currentSelectedList} />
    }
    else{
        return <CommentsSection />
    }
}

export default PlayerWrapper;