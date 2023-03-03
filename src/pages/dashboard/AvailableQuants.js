import {React, useState, useEffect, Fragment} from 'react';
import {db} from '../../FirebaseConfig';
import {doc, collection, getDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import QuantSelectee from "../../components/cards/statistics/QuantSelectee";
import {Button, ButtonBase, CardActionArea, Grid, Stack, Typography} from "@mui/material";
import theme from "../../themes/theme";
import {useTheme} from "@mui/material/styles";
import {auth, getAuth} from 'firebase/auth';
import TFLogo from '../../assets/images/tradefusion_avatar.png';

export default function AvailableQuants(props) {
  const [fetchedQuants, setQuants] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [quantsLoaded, setQuantsLoaded] = useState(false);
  const [quantSubs, setQuantSubs] = useState(['']);
  const uid = getAuth().currentUser.uid;

  const fetchQuants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "quant_names"));
      querySnapshot.forEach((doc) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setQuants(newData);
        setQuantsLoaded(true);
      });

      const subs_ref = `users/${uid}`;
      const doc_ref = doc(db, subs_ref);
      const queryUserSubs = await getDoc(doc_ref);
      const quantS = queryUserSubs.data()['quant_subscriptions'];
      setQuantSubs(quantS);

    } catch (error){
      console.log("Error fetching quants", error);
    }

  }

  const subscribeHandler = async (quantName) => {

    const docRef = `users/${uid}/`;
    try
    {
      await updateDoc(doc(db, docRef), {
        quant_subscriptions: arrayUnion(`${quantName}`)
      });

      setQuantSubs(prevState => [...prevState, quantName]);

    } catch (error) {
      console.log("Error adding subscription", error);
    }
  }

  const unsubscribeHandler = async (quantName) => {
    const docRef = `users/${uid}/`;
    try
    {
      await updateDoc(doc(db, docRef), {
        quant_subscriptions: arrayRemove(`${quantName}`)
      });


      setQuantSubs(prevState =>
        prevState.filter((name) => name !== quantName)
      );

    } catch (error) {
      console.log("Error removing subscription", error);
    }
  }


  const onClickHandler = (quant, index) => {
    props.onSelectedQuant(quant);
    setIsSelected(index);
  }

  useEffect(() => {
    fetchQuants();
  }, [])




  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Available Quants</Typography>
      </Grid>
      {!quantsLoaded &&
        <Grid item container justifyContent={"space-between"} spacing={2}>
          <Grid item xs={12} sm={6} lg={6}>
            <QuantSelectee color='' loaded={false} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <QuantSelectee color='' loaded={false}/>
          </Grid>
        </Grid>
      }
      {quantsLoaded && fetchedQuants.map((quant, index) => (
        <Grid key={index} item xs={12} sm={6} lg={6}>
          {/*disabled={!quantSubs.includes(quant.id)}*/}
          <Button disabled={quantSubs.includes(quant.about.display_name)} onClick={() => subscribeHandler(quant.about.display_name)}>
            Subscribe
          </Button>
          <Button disabled={!quantSubs.includes(quant.about.display_name)} onClick={() => unsubscribeHandler(quant.about.display_name)}>
            Unsubscribe
          </Button>
          <CardActionArea  disabled={!quantSubs.includes(quant.about.display_name)} onClick={()=> onClickHandler(quant, index)}>
            {isSelected === index &&
              <QuantSelectee title="Total Bots" totalBots={Object.keys(quant.bots).length.toString()} color="primary"
                             icon={TFLogo} quantName={quant.about.display_name} loaded={true} subscribed={quantSubs.includes(quant.about.display_name)}/>}
            {isSelected !== index &&
              <QuantSelectee title="Total Bots" totalBots={Object.keys(quant.bots).length.toString()} color={""}
                             icon={TFLogo} quantName={quant.about.display_name} loaded={true} subscribed={quantSubs.includes(quant.about.display_name)}/>}
          </CardActionArea>

        </Grid>
      ))
      }
    </Grid>
  );
}