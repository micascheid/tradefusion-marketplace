import {React, useState, useEffect} from 'react';
import {db} from '../../FirebaseConfig';
import {doc, collection, getDoc, getDocs} from "firebase/firestore";
import QuantSelectee from "../../components/cards/statistics/QuantSelectee";
import {ButtonBase, CardActionArea, Grid, Typography} from "@mui/material";

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

  const onClickHandler = quant => {

    props.onSelectedQuant(quant);
  }

  useEffect(()=>{
    fetchQuants();
  }, [])


  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Available Qaunts</Typography>
      </Grid>
      {fetchedQuants.map((quant,index) => (
          <Grid key={index} item xs={12} lg={4}>
            <CardActionArea key={index} onClick={() => onClickHandler(quant)}>
              <QuantSelectee quantName={quant.id}/>
            </CardActionArea>
          </Grid>
        ))
      }
    </Grid>
  );
}

