import {React, useState, useEffect} from 'react';
import {db} from '../../FirebaseConfig';
import {doc, collection, getDoc, getDocs} from "firebase/firestore";
import QuantSelectee from "../../components/cards/statistics/QuantSelectee";
import {Grid, Typography} from "@mui/material";

export default function AvailableQuants(props) {

  const test = ['mica', 'rando'];
  const [fetchedQuants, setQuants] = useState(['mica', 'rando']);
  const fetchQuants = async () => {
    await getDocs(collection(db, "quant_names"))
      .then((querySnapshot)=>{
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
        setQuants(newData);
      })

  }

  useEffect(()=>{
    fetchQuants();
  }, [])

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Available Qaunts</Typography>
      </Grid>
      {/*<Grid item xs={12} lg={4}>*/}
      {/*  <QuantSelectee totalBots="35,000"/>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} lg={4}>*/}
      {/*  <QuantSelectee extra="35,000"/>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} lg={4}>*/}
      {/*  <QuantSelectee extra="35,000"/>*/}
      {/*</Grid>*/}
      {/*{props.quants.map((name) => (*/}
      {/*<Grid item xs={12} lg={4}>*/}
      {/*  <QuantSelectee quantName={name}/>*/}
      {/*</Grid>*/}
      {/*))}*/}
      {fetchedQuants.map((quant, index) => (
          <Grid key={index} item xs={12} lg={4}>
            <QuantSelectee quantName={quant.id}/>
          </Grid>
        ))
      }
    </Grid>
  );
}

