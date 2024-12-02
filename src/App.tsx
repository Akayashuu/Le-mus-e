import Collection from "./component/Collection";
import RicksMuseumApiWrapper from "./modules/RicksMuseumApi";

function App() {
    const painting = RicksMuseumApiWrapper.getArtObjects();
    return (
        <Collection itemPerPage={12} data={painting} />
    );
}

export default App;
