import React,{useEffect, useState, useRef} from "react";

const Stepper = ({steps, currentStep}) => {

    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) =>{
        const newSteps = [...steps]
        let count = 0;
        while(count < newSteps.length){
            //current step 
            if(count===stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlight:true,
                    selected:true,
                    completed: true,
                };
                count++;
            }
            //Step completed....
            else if(count < stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlight: false,
                    selected:true,
                    completed: true,
                };
                count++;
            }
            //Step pending....
            else{
                newSteps[count] = {
                    ...newSteps[count],
                    highlight: false,
                    selected:false,
                    completed: false,
                };
                count++;
            }

            return newSteps;
        }
    }

    useEffect(()=>{
        //Create Object
        const stepsState =  steps.map((step, index)=>
            Object.assign({},{
                description: step,
                completed: false,
                highlighted: index===0 ? true : false,
                selected: index===0 ? true:false,
            })
        );
        stepRef.current = stepsState;
        const current = updateStep(currentStep-1, stepRef.current);
        setNewStep(current);

    },[steps, currentStep]);

    const dispalySteps = newStep.map((step, index) =>{
       return (
        <div key={index} className={index!==newStep.length-1 ? "w-full flex items-center":
            "flex items-center"
        }>
          <div className="relative flex flex-col items-center text-teal-600">
            {/* Display Number  */}
            <div
              className="p-2 px-4 font-semibold text-black rounded-full border -2 border-gray-300 bg-slate-400 
                  transition duration-500 ease-in-out"
            >
              {index+1}
            </div>
            {/* Display Description  */}
            <div
              className="absolute top-0 w-32 text-center text-xs
                  mt-14 font-medium uppercase"
            >
              {step.description}
            </div>
          </div>
      
          {/* Display line  */}
          <div className="flex-auto border-t-2"></div>
        </div>
       )
    });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {dispalySteps}
    </div>
  );
};

export default Stepper;