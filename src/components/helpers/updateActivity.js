function updateActivity(data) {
  // Duomenų struktūra laikina, "latestTrending": "" skirtas testavimui, nebent nuspręsime kitaip
  const { contentsId, activity } = data;

  if (contentsId.length === 0) {
    // Masyvas yra tuščias mapinti random
    console.log("ContentsId masyvas yra tuščias");
    //
  } else if (activity === contentsId.length) {
    // Activity reikšmė lygi contentsId masyvo dydžiui niekas nesikeicia
    console.log("Activity reikšmė lygi contentsId masyvo dydžiui");
    // 
  } else {
    // Activity reikšmė nelygi contentsId masyvo dydžiui darom rekomendaciju perskaičiavimus
    console.log("Activity reikšmė nelygi contentsId masyvo dydžiui");
    data.activity = contentsId.length; // Nustatome activity reikšmę lygią contentsId masyvo dydžiui
    // 
  }

  return data;
}
