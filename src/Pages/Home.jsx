import '../App.css';
import Navbar from '../Components/Navbar';
import Introduction from '../Components/Introduction';
import Vision from '../Components/Vision';
import Collections from '../Components/Collections';
import CollectionsInfo from '../Components/CollectionsInfo';
import ImportantInfo from '../Components/ImportantInfo';
import TokenDisplay from '../Components/TokenDisplay';
import CommunityInfo from '../Components/CommunityInfo';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Introduction />
        <Vision />
        <Collections />
        <CollectionsInfo />
        <ImportantInfo />
        <TokenDisplay />
        <CommunityInfo />
        <Footer />
    </div>
  )
}

export default Home;