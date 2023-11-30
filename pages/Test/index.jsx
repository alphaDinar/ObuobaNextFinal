import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStoreDB } from "../../Firebase/base";

const Test = () => {
  const [currentProgram, setCurrentProgram] = useState('');
  const [nextProgram, setNextProgram] = useState('');


  useEffect(()=>{
    getDoc(doc(fireStoreDB, 'Obuoba/con'))
    .then((res)=>{
      const day = new Date().getDay();
      const nextDay = new Date(new Date().setDate(new Date().getDate() + 1)).getDay();
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const sortByHour =(a, b)=>{
        const hourA = a.start.split(',')[0]
        const hourB = b.start.split(',')[0]
        return hourA - hourB;
      }
      const dailyPrograms = (res.data().programs.filter((el)=> parseInt(el.day) === day)).sort(sortByHour)
      
      dailyPrograms.map((el)=>{
        const startHours = parseInt(el.start.split(',')[0]);
        const startMinutes = parseInt(el.start.split(',')[1]);
        const endHours = parseInt(el.end.split(',')[0]);
        const endMinutes = parseInt(el.end.split(',')[1]);

        if (
          (hours > startHours || (hours === startHours && minutes >= startMinutes)) &&
          (hours < endHours || (hours === endHours && minutes <= endMinutes))
        ) {
          setCurrentProgram(el);
        }
        const currentProgramIndex = dailyPrograms.indexOf(el);

        if (dailyPrograms[currentProgramIndex + 1]) {
          setNextProgram(dailyPrograms[currentProgramIndex + 1]);
        } else {
          setNextProgram((res.data().programs.filter((el)=> parseInt(el.day) === nextDay)).sort(sortByHour)[0])
        }
      })
    })

  }, [])

  return ( 
    <section>
      {currentProgram && 
        <span>{currentProgram.name}</span>
      }

      {nextProgram &&
        <span>{nextProgram.name}</span>
      }
    </section>
   );
}
 
export default Test;