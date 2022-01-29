import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export default function ChipData(props) {
  const {
      section,
      setRightContent,
      selectedMedicalProblemsChipData,
      rightContent,
      medicalProblemsChipData,
      setMedicalProblemChipData,
      allergiesChipData,
      setAllergiesChipData,
      selectedAllergiesChipData,
      setSelectedAllergiesChipData,
      proceduriesChipData,
      setProceduresChipData,
      selectedProceduresChipData,
      setSelectedProceudresChipData,
      lifestylesChipData,
      setLifeStylesChipData,
      selectedLifeStylesChipData,
      setSelectedLifeStylesChipData,
      diagnosisChipData,
      setDiagnosisChipData,
      setSelectedDiagnosisChipData,
      familyChipData,
      setFamilyChipData,
      selectedFamilyChipData,
      setSelectedFamilyChipData,
      selectedDiagnosisChipData,
      setSelectedMedicalProblemsChipData,
      patientMedicalHistory
    } = props;
  
  const classes = useStyles();

  React.useEffect(() => {
    switch(rightContent.id) {
      case "medicalProblemsChipData":
        const intemSelMedicalProb = [...selectedMedicalProblemsChipData];
        const findIndexof = intemSelMedicalProb.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findIndexof !== -1) {
          intemSelMedicalProb[findIndexof]["notes"] = rightContent.notes;
          intemSelMedicalProb[findIndexof]["since"] = rightContent.since;
          setSelectedMedicalProblemsChipData(intemSelMedicalProb);
        }
        break;
      case "allergiesChipData":
        const intermAllergiesProblem = [...selectedAllergiesChipData];
        const findAllergiesIndoxOf = intermAllergiesProblem.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findAllergiesIndoxOf !== -1) {
          intermAllergiesProblem[findAllergiesIndoxOf]["notes"] = rightContent.notes;
          intermAllergiesProblem[findAllergiesIndoxOf]["since"] = rightContent.since;
          setSelectedAllergiesChipData(intermAllergiesProblem);
        }
        break;
      case "proceduriesChipData":
        const intermProceduresProb = [...selectedProceduresChipData];
        const findProcedureProbs = intermProceduresProb.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findAllergiesIndoxOf !== -1) {
          intermProceduresProb[findProcedureProbs]["notes"] = rightContent.notes;
          intermProceduresProb[findProcedureProbs]["since"] = rightContent.since;
          setSelectedProceudresChipData(intermProceduresProb);
        }
        break;
      case "lifestylesChipData":
        const intermLifeStyleProb = [...selectedLifeStylesChipData];
        const findLifeStyleProb = intermLifeStyleProb.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findLifeStyleProb !== -1) {
          intermLifeStyleProb[findLifeStyleProb]["notes"] = rightContent.notes;
          intermLifeStyleProb[findLifeStyleProb]["since"] = rightContent.since;
          setSelectedLifeStylesChipData(intermLifeStyleProb);
        }
        break;
      case "diagnosisChipData":
        const intermDiagnosisProb = [...selectedDiagnosisChipData];
        const findDiagnosisIndex = intermDiagnosisProb.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findLifeStyleProb !== -1) {
          intermDiagnosisProb[findDiagnosisIndex]["notes"] = rightContent.notes;
          intermDiagnosisProb[findDiagnosisIndex]["since"] = rightContent.since;
          setSelectedDiagnosisChipData(intermDiagnosisProb);
        }
        break;
      case "familyChipData":
        const intermFamilyProb = [...selectedFamilyChipData];
        const findIntermIndex = intermFamilyProb.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findLifeStyleProb !== -1) {
          intermFamilyProb[findIntermIndex]["notes"] = rightContent.notes;
          intermFamilyProb[findIntermIndex]["since"] = rightContent.since;
          setSelectedFamilyChipData(intermFamilyProb);
        }
        break;
      default:
        const intemSelMedicalProbDef = [...selectedMedicalProblemsChipData];
        const findIndexofDef = intemSelMedicalProbDef.findIndex((medicalProb) => medicalProb.name === rightContent.title);
        if(findIndexofDef !== -1) {
          intemSelMedicalProbDef[findIndexofDef]["notes"] = rightContent.notes;
          intemSelMedicalProbDef[findIndexofDef]["since"] = rightContent.since;
          setSelectedMedicalProblemsChipData(intemSelMedicalProbDef);
        }
        break;
    }
  },[rightContent.notes, rightContent.since]);

  const handleDelete = (selCData) => {
    switch(selCData.section) {
      case "medicalProblemsChipData":
        const intMedProb = [...selectedMedicalProblemsChipData];
        const intMedProb2 = [...medicalProblemsChipData];
        const findMedProb = intMedProb.find((medProb) => medProb.name === selCData.name);
        if(findMedProb) {
          const indexOfMedProb = intMedProb.indexOf(findMedProb);
          if(indexOfMedProb > -1) {
            intMedProb.splice(indexOfMedProb, 1);
          }
        }
        setSelectedMedicalProblemsChipData(intMedProb);
        break;
      case "allergiesChipData":
        const intAllProb = [...selectedAllergiesChipData];
        const intAllProb2 = [...allergiesChipData];
        const findAllProb = intAllProb.find((medProb) => medProb.name === selCData.name);
        if(findAllProb) {
          const indexOfAllProb = intAllProb.indexOf(findAllProb);
          if(indexOfAllProb > -1) {
            intAllProb.splice(indexOfAllProb, 1);
          }
        }
        setSelectedAllergiesChipData(intAllProb);
        break;
      case "proceduriesChipData":
        const intProcProb = [...selectedProceduresChipData];
        const intProcProb2 = [...proceduriesChipData];
        const findProcProb = intProcProb.find((medProb) => medProb.name === selCData.name);
        if(findProcProb) {
          const indexOfProbProb = intProcProb.indexOf(findProcProb);
          if(indexOfProbProb > -1) {
            intProcProb.splice(indexOfProbProb, 1);
          }
        }
        setSelectedProceudresChipData(intProcProb);
        break;
      case "lifestylesChipData":
        const intLifeStyleProb = [...selectedLifeStylesChipData];
        const intLifeStyleProb2 = [...lifestylesChipData];
        const findLifestyleProb = intLifeStyleProb.find((medProb) => medProb.name === selCData.name);
        if(findLifestyleProb) {
          const indexOfLifestyleProb = intLifeStyleProb.indexOf(findLifestyleProb);
          if(indexOfLifestyleProb > -1) {
            intLifeStyleProb.splice(indexOfLifestyleProb, 1);
          }
        }
        setSelectedLifeStylesChipData(intLifeStyleProb);
        break;
      case "diagnosisChipData":
        const intDigProb = [...selectedDiagnosisChipData];
        const intDigProb2 = [...diagnosisChipData];
        const findDigProb = intDigProb.find((medProb) => medProb.name === selCData.name);
        if(findDigProb) {
          const indexOfDigProb = intDigProb.indexOf(findDigProb);
          if(indexOfDigProb > -1) {
            intDigProb.splice(indexOfDigProb, 1);
          }
        }
        setSelectedDiagnosisChipData(intDigProb);
      case "familyChipData":
        const intFamilyProb = [...selectedFamilyChipData];
        const intFamilyProb2 = [...familyChipData];
        const findFamilyProb = intFamilyProb.find((medProb) => medProb.name === selCData.name);
        if(findFamilyProb) {
          const indexOfFamilyProb = intFamilyProb.indexOf(findFamilyProb);
          if(indexOfFamilyProb > -1) {
            intFamilyProb.splice(indexOfFamilyProb, 1);
          }
        }
        setSelectedFamilyChipData(intFamilyProb);
      default:
        const intMedProbDef = [...selectedMedicalProblemsChipData];
        const intMedProb2Def = [...medicalProblemsChipData];
        const findMedProbDef = intMedProbDef.find((medProb) => medProb.name === selCData.name);
        if(findMedProbDef) {
          const indexOfMedProbDef = intMedProbDef.indexOf(findMedProbDef);
          if(indexOfMedProbDef > -1) {
            intMedProbDef.splice(indexOfMedProbDef, 1);
          }
        }
        setSelectedMedicalProblemsChipData(intMedProbDef);
        break;
    }
  };

  let chipData = [];
  let chipData2 = [];

  switch(section) {
    case "medical":
      chipData = medicalProblemsChipData;
      chipData2 = selectedMedicalProblemsChipData;
      break;
    case "allergies":
      chipData = allergiesChipData;
      chipData2 = selectedAllergiesChipData;
      break;
    case "family":
      chipData = familyChipData;
      chipData2 = selectedFamilyChipData;
      break;
    case "lifestyle":
      chipData = lifestylesChipData;
      chipData2 = selectedLifeStylesChipData;
      break;
    case "procedures":
      chipData = proceduriesChipData;
      chipData2 = selectedProceduresChipData;
      break;
    case "riskFactor":
      chipData = diagnosisChipData;
      chipData2 = selectedDiagnosisChipData;
      break;
    default:
      chipData = medicalProblemsChipData;
      chipData2 = selectedMedicalProblemsChipData;
      break;
  }

  const handleChipAdd = (selCData) => {

    switch(selCData.section) {
      case "medicalProblemsChipData":
        const findMedProb = selectedMedicalProblemsChipData.find((medProb) => medProb.name === selCData.name);
        if(findMedProb) {
          return;
        } else {
          setSelectedMedicalProblemsChipData([...selectedMedicalProblemsChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        
        break;
      case "allergiesChipData":
        const findAllProb = selectedAllergiesChipData.find((medProb) => medProb.name === selCData.name);
        if(findAllProb) {
          return;
        } else {
          setSelectedAllergiesChipData([...selectedAllergiesChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        break;
      case "proceduriesChipData":
        const findProcProb = selectedProceduresChipData.find((medProb) => medProb.name === selCData.name);
        if(findProcProb) {
          return;
        } else {
          setSelectedProceudresChipData([...selectedProceduresChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        break;
      case "lifestylesChipData":
        const findLifestyleProb = selectedLifeStylesChipData.find((medProb) => medProb.name === selCData.name);
        if(findLifestyleProb) {
          return;
        } else {
          setSelectedLifeStylesChipData([...selectedLifeStylesChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        break;
      case "diagnosisChipData":
        const findDigProb = selectedDiagnosisChipData.find((medProb) => medProb.name === selCData.name);
        if(findDigProb) {
          return;
        } else {
          setSelectedDiagnosisChipData([...selectedDiagnosisChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        break;
      case "familyChipData":
        const findFamilyProb = selectedFamilyChipData.find((medProb) => medProb.name === selCData.name);
        if(findFamilyProb) {
          return;
        } else {
          setSelectedFamilyChipData([...selectedFamilyChipData, {
            name: selCData.name,
            notes: "",
            since: "",
            section: selCData.section,
            key: selCData.key, 
          }]);

          setRightContent({
            title: selCData.name,
            notes: "",
            since: "",
            id: selCData.section,
          });
        }
        break;
      default:
        const intMedProbDef = [...medicalProblemsChipData];
        const findMedProbDef = intMedProbDef.find((medProb) => medProb.name === selCData.name);
        if(findMedProbDef) {
          const indexOfMedProbDef = intMedProbDef.indexOf(findMedProbDef);
          if(indexOfMedProbDef > -1) {
            intMedProbDef.splice(indexOfMedProbDef, 1);
          }
        }
        setMedicalProblemChipData(intMedProbDef);
        setSelectedMedicalProblemsChipData([...selectedMedicalProblemsChipData, {
          name: selCData.name,
          notes: "",
          since: "",
          section: selCData.section,
          key: selCData.key, 
        }]);
        break;
    }
  }

  const handleSelectedDataClick = (selDataClick) => {

    switch(selDataClick.section) {

      case "medicalProblemsChipData":
        if(
          (patientMedicalHistory.medical_problems_array) &&
          (patientMedicalHistory.medical_problems_array.length > 0)
        ) {
          const filteredPatientMedicalProb = patientMedicalHistory.medical_problems_array.find((pMPC) => pMPC.name ===  selDataClick.name)
          if(filteredPatientMedicalProb) {
            setRightContent({
              title: filteredPatientMedicalProb.name,
              notes: filteredPatientMedicalProb.notes ? filteredPatientMedicalProb.notes : "",
              since: filteredPatientMedicalProb.since ? filteredPatientMedicalProb.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findMedicalProbCihpData = selectedMedicalProblemsChipData.find((mPC) => mPC.name === selDataClick.name)
          if (findMedicalProbCihpData) {
            setRightContent({
              title: findMedicalProbCihpData.name,
              notes: findMedicalProbCihpData.notes,
              since: findMedicalProbCihpData.since,
              id: findMedicalProbCihpData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      case "allergiesChipData":
        if(
          (patientMedicalHistory.allergies_array) &&
          (patientMedicalHistory.allergies_array.length > 0)
        ) {
          const filteredPatientAllergies = patientMedicalHistory.allergies_array.find((pAA) => pAA.name ===  selDataClick.name)
          if(filteredPatientAllergies) {
            setRightContent({
              title: filteredPatientAllergies.name,
              notes: filteredPatientAllergies.notes ? filteredPatientAllergies.notes : "",
              since: filteredPatientAllergies.since ? filteredPatientAllergies.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findAllergiesChipData = selectedAllergiesChipData.find((aPC) => aPC.name === selDataClick.name)
          if (findAllergiesChipData) {
            setRightContent({
              title: findAllergiesChipData.name,
              notes: findAllergiesChipData.notes,
              since: findAllergiesChipData.since,
              id: findAllergiesChipData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      case "proceduriesChipData":
        if(
          (patientMedicalHistory.procedures_array) &&
          (patientMedicalHistory.procedures_array.length > 0)
        ) {
          const filteredPatientProcedures = patientMedicalHistory.procedures_array.find((ppA) => ppA.name ===  selDataClick.name)
          if(filteredPatientProcedures) {
            setRightContent({
              title: filteredPatientProcedures.name,
              notes: filteredPatientProcedures.notes ? filteredPatientProcedures.notes : "",
              since: filteredPatientProcedures.since ? filteredPatientProcedures.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findProceduresChipData = selectedProceduresChipData.find((aPC) => aPC.name === selDataClick.name)
          if (findProceduresChipData) {
            setRightContent({
              title: findProceduresChipData.name,
              notes: findProceduresChipData.notes,
              since: findProceduresChipData.since,
              id: findProceduresChipData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      case "lifestylesChipData":
        if(
          (patientMedicalHistory.lifestyles_array) &&
          (patientMedicalHistory.lifestyles_array.length > 0)
        ) {
          const filteredPatientLifeStyles = patientMedicalHistory.lifestyles_array.find((pLA) => pLA.name ===  selDataClick.name)
          if(filteredPatientLifeStyles) {
            setRightContent({
              title: filteredPatientLifeStyles.name,
              notes: filteredPatientLifeStyles.notes ? filteredPatientLifeStyles.notes : "",
              since: filteredPatientLifeStyles.since ? filteredPatientLifeStyles.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findLifestyleChipData = selectedLifeStylesChipData.find((lPC) => lPC.name === selDataClick.name)
          if (findLifestyleChipData) {
            setRightContent({
              title: findLifestyleChipData.name,
              notes: findLifestyleChipData.notes,
              since: findLifestyleChipData.since,
              id: findLifestyleChipData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      case "diagnosisChipData":
        if(
          (patientMedicalHistory.risk_factors_array) &&
          (patientMedicalHistory.risk_factors_array.length > 0)
        ) {
          const filteredPatientDiagnosis = patientMedicalHistory.risk_factors_array.find((pDA) => pDA.name ===  selDataClick.name)
          if(filteredPatientDiagnosis) {
            setRightContent({
              title: filteredPatientDiagnosis.name,
              notes: filteredPatientDiagnosis.notes ? filteredPatientDiagnosis.notes : "",
              since: filteredPatientDiagnosis.since ? filteredPatientDiagnosis.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findDiagChipData = selectedDiagnosisChipData.find((dPC) => dPC.name === selDataClick.name)
          if (findDiagChipData) {
            setRightContent({
              title: findDiagChipData.name,
              notes: findDiagChipData.notes,
              since: findDiagChipData.since,
              id: findDiagChipData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      case "familyChipData":
        if(
          (patientMedicalHistory.family_histories_array) &&
          (patientMedicalHistory.family_histories_array.length > 0)
        ) {
          const filteredPatientFamily = patientMedicalHistory.family_histories_array.find((pfa) => pfa.name ===  selDataClick.name)
          if(filteredPatientFamily) {
            setRightContent({
              title: filteredPatientFamily.name,
              notes: filteredPatientFamily.notes ? filteredPatientFamily.notes : "",
              since: filteredPatientFamily.since ? filteredPatientFamily.since : "",
              id: selDataClick.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        } else {
          const findFamilyChipData = selectedFamilyChipData.find((fPC) => fPC.name === selDataClick.name)
          if (findFamilyChipData) {
            setRightContent({
              title: findFamilyChipData.name,
              notes: findFamilyChipData.notes,
              since: findFamilyChipData.since,
              id: findFamilyChipData.section,
            });
          } else {
            setRightContent({
              title: selDataClick.name,
              notes: "",
              since: "",
              id: selDataClick.section,
            });
          }
        }
        break;

      default:
        setRightContent({
          title: selDataClick.name,
          notes: "",
          since: "",
          id: selDataClick.section,
        });
        break;
    }
  }

  return (
    <div>
      <ul className={classes.root}>
        {chipData2.map((data) => {
          let icon;

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.name}
                className={classes.chip}
                onDelete={() => handleDelete(data)}
                onClick={() => handleSelectedDataClick(data)}
              />
            </li>
          );
        })}
      </ul>
      <ul className={classes.root}>
        {chipData.map((data) => {
          return (
            <li key={data.key}>
              <Chip
                label={data.name}
                variant="outlined"
                className={classes.chip}
                onClick={() => handleChipAdd(data)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
