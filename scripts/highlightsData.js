
    // Represent each carousel elements from html
    let allHighlightsDiv = document.getElementById('all-highlights')
    let collectedForYouDiv = document.getElementById('collected-for-you')
    let signLanguageDiv = document.getElementById('sign-language')
    let everyTeamGoalsDiv = document.getElementById('every-teams-goals')
    let highScoringClubsDiv = document.getElementById('high-scoring-clubs')
    let watchTheirGoalsDiv = document.getElementById('watch-their-goals')
    let finalsDiv = document.getElementById('finals')
    let semiFinalsDiv = document.getElementById('semi-finals')
    let quaterFinalsDiv = document.getElementById('quater-finals')
    let roundSixteenDiv = document.getElementById('round-sixteen')

    // Read json data
    const jsonData = "../data/highlightsData.json"

    // Data fetching function
    async function logData(){
        const response = await fetch(jsonData)
        const data = await response.json()
        // console.log(data)
        console.log("All highlights :: " ,data.allHighlights.length)
        console.log("Collected for you :: " ,data.collectedForYou.length)
        console.log("Sign language :: ",data.signLanguage.length)


        let i;
        // Content for each carousel
        let allHighlightscontent = ``;
        let collectedForYouContent = ``;
        let signLanguageContent =``;
        let everyTeamGoalsContent = ``;
        let highScoringClubsContent = ``;
        let watchTheirGoalsContent = ``;
        let finalsContent = ``;
        let semiFinalsContent = ``;
        let quaterFinalsContent = ``;
        let roundSixteenContent = ``;

        for(i=0;i<data.allHighlights.length;i++){
            console.log(data.allHighlights[i].image)
            console.log(data.allHighlights[i].title)

            

            allHighlightscontent += `<li class="" >
                <div class="card">
                    <div class="img" >
                        <img src="${data.allHighlights[i].image}" alt="" draggable="false">
                    </div>
                
                <p class="landing-para">${data.allHighlights[i].title}</p>
            </div>
            </li>`

            allHighlightsDiv.innerHTML = allHighlightscontent
            
        }

        for(i=0;i<data.collectedForYou.length;i++){
            collectedForYouContent += `
                <li class="" >
                    <div class="card-large">
                        <div class="img-large" >
                            <img src="${data.collectedForYou[i].image}" alt="" draggable="false">
                        </div>
                    </div>
                    
                        <p class="landing-para">${data.collectedForYou[i].title}</p>    
                </li>
            `
            collectedForYouDiv.innerHTML = collectedForYouContent
        }

        for(i=0;i<data.signLanguage.length;i++){


            signLanguageContent +=`
                <li class="" >
                    <div class="card-large">
                        <div class="img-large" >
                            <img src="${data.signLanguage[i].image}" alt="" draggable="false">
                        </div>
                    </div>
                    

                    
                        <p class="landing-para">${data.signLanguage[i].title}</p>
                    
                    
                </li>
            `
            signLanguageDiv.innerHTML = signLanguageContent
            
        }

        for(i=0;i<data.everyTeamGoals.length;i++){

            everyTeamGoalsContent += `
                <li class="" >
                        <div class="card-small">
                            <div class="img-small" >
                                <img src="${data.everyTeamGoals[i].image}" alt="" draggable="false">
                            </div>
                        </div>
                            <p class="landing-para">${data.everyTeamGoals[i].title}</p>
                </li>

            `
            everyTeamGoalsDiv.innerHTML = everyTeamGoalsContent

        }

        for(i=0;i<data.highScoringClubs.length;i++){
            console.log(data.highScoringClubs.length)
            highScoringClubsContent += `
                <li class="" >
                        <div class="card-small">
                            <div class="img-small" >
                                <img src="${data.highScoringClubs[i].image}" alt="" draggable="false">
                            </div>
                        </div>
                            <p class="landing-para">${data.highScoringClubs[i].title}</p>
                </li>

            `
            highScoringClubsDiv.innerHTML = highScoringClubsContent

        }

        for(i=0;i<data.watchGoals.length;i++){
            console.log(data.watchGoals.length)
            watchTheirGoalsContent += `
                <li class="" >
                        <div class="card-small">
                            <div class="img-small" >
                                <img src="${data.watchGoals[i].image}" alt="" draggable="false">
                            </div>
                        </div>
                            <p class="landing-para">${data.watchGoals[i].title}</p>
                </li>

            `
            
            watchTheirGoalsDiv.innerHTML = watchTheirGoalsContent

        }

        for(i=0;i<data.finals.length;i++){
            console.log(data.finals.length)
            finalsContent += `
                <li class="" >
                    <div class="card-large">
                        <div class="img-large" >
                            <img src="${data.finals[i].image}" alt="" draggable="false">
                        </div>
                    </div>
                        <p class="landing-para">${data.finals[i].title}</p>
                    
                </li>
            `     
            finalsDiv.innerHTML = finalsContent

        }

        for(i=0;i<data.semiFinals.length;i++){
            console.log(data.semiFinals.length)
            semiFinalsContent += `
                <li class="" >
                    <div class="card-large">
                        <div class="img-large" >
                            <img src="${data.semiFinals[i].image}" alt="" draggable="false">
                        </div>
                    </div>
                        <p class="landing-para">${data.semiFinals[i].title}</p>
                    
                </li>
            `     
            semiFinalsDiv.innerHTML = semiFinalsContent

        }

        for(i=0;i<data.quaterFinals.length;i++){
            console.log(data.quaterFinals[i].image)
            console.log(data.quaterFinals[i].title)

            quaterFinalsContent += `<li class="" >
                <div class="card">
                    <div class="img" >
                        <img src="${data.quaterFinals[i].image}" alt="" draggable="false">
                    </div>
                
                <p class="landing-para">${data.quaterFinals[i].title}</p>
            </div>
            </li>`

            quaterFinalsDiv.innerHTML = quaterFinalsContent
            
        }

        for(i=0;i<data.roundSixteen.length;i++){
            console.log(data.roundSixteen.length)
            roundSixteenContent += `
                <li class="" >
                        <div class="card-small">
                            <div class="img-small" >
                                <img src="${data.roundSixteen[i].image}" alt="" draggable="false">
                            </div>
                        </div>
                            <p class="landing-para">${data.roundSixteen[i].title}</p>
                </li>

            `
            roundSixteenDiv.innerHTML = roundSixteenContent

        }


        // allHighlightsDiv.innerHTML = allHighlightscontent
        // collectedForYouDiv.innerHTML = collectedForYouContent
        // signLanguageDiv.innerHTML = signLanguageContent
    }
    logData()
