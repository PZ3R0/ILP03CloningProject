
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
    let groupADiv = document.getElementById('group-a')
    let groupBDiv = document.getElementById('group-b')
    let groupCDiv = document.getElementById('group-c')
    let groupDDiv = document.getElementById('group-d')
    let groupEDiv = document.getElementById('group-e')
    let groupFDiv = document.getElementById('group-f')
    let groupGDiv = document.getElementById('group-g')
    let groupHDiv = document.getElementById('group-h')
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
        let groupAContent = ``;
        let groupBContent = ``;
        let groupCContent = ``;
        let groupDContent = ``
        let groupEContent = ``;
        let groupFContent = ``;
        let groupGContent = ``;
        let groupHContent = ``;

        for(i=0;i<data.allHighlights.length;i++){
            console.log(data.allHighlights[i].image)
            console.log(data.allHighlights[i].title)

            

            allHighlightscontent += `<li class="" >
                <div class="card">
                    <div class="img" >
                        <a href="viewhighlights.html?data=allHighlights&id=${i}">
                            <img src="${data.allHighlights[i].image}" alt="" draggable="false">
                        </a>
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
                        <a href="viewhighlights.html?data=collectedForYou&id=${i}">
                            <img src="${data.collectedForYou[i].image}" alt="" draggable="false">
                        </a>
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
                        <a href="viewhighlights.html?data=signLanguage&id=${i}">
                            <img src="${data.signLanguage[i].image}" alt="" draggable="false"></a>
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
                            <a href="viewhighlights.html?data=everyTeamGoals&id=${i}">
                                <img src="${data.everyTeamGoals[i].image}" alt="" draggable="false">
                            </a>
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
                            <a href="viewhighlights.html?data=highScoringClubs&id=${i}">
                                <img src="${data.highScoringClubs[i].image}" alt="" draggable="false">
                            </a>
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
                            <a href="viewhighlights.html?data=watchGoals&id=${i}">
                                <img src="${data.watchGoals[i].image}" alt="" draggable="false">
                                </a>
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
                        <a href="viewhighlights.html?data=finals&id=${i}">
                            <img src="${data.finals[i].image}" alt="" draggable="false">
                        </a>
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
                        <a href="viewhighlights.html?data=semiFinals&id=${i}">
                            <img src="${data.semiFinals[i].image}" alt="" draggable="false"></a>
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
                    <a href="viewhighlights.html?data=quaterFinals&id=${i}">
                        <img src="${data.quaterFinals[i].image}" alt="" draggable="false"></a>
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
                            <a href="viewhighlights.html?data=roundSixteen&id=${i}">
                                <img src="${data.roundSixteen[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.roundSixteen[i].title}</p>
                </li>

            `
            roundSixteenDiv.innerHTML = roundSixteenContent

        }

        for(i=0;i<data.groupA.length;i++){
            console.log(data.groupA.length)
            groupAContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupA&id=${i}">
                                <img src="${data.groupA[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupA[i].title}</p>
                </li>

            `
            groupBContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupB&id=${i}">
                                <img src="${data.groupB[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupB[i].title}</p>
                </li>
            `

            groupCContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupC&id=${i}">
                                <img src="${data.groupC[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupC[i].title}</p>
                </li>
            `

            groupDContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupD&id=${i}">
                                <img src="${data.groupD[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupD[i].title}</p>
                </li>
            `

            groupEContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupE&id=${i}">
                                <img src="${data.groupE[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupE[i].title}</p>
                </li>
            `

            groupFContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupF&id=${i}">
                                <img src="${data.groupF[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupF[i].title}</p>
                </li>
            `

            groupGContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupG&id=${i}">
                                <img src="${data.groupG[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupG[i].title}</p>
                </li>
            `

            groupHContent += `
                <li class="card" >
                        <div class="">
                            <div class="img" >
                            <a href="viewhighlights.html?data=groupH&id=${i}">
                                <img src="${data.groupH[i].image}" alt="" draggable="false"></a>
                            </div>
                        </div>
                            <p class="landing-para">${data.groupH[i].title}</p>
                </li>
            `


            groupADiv.innerHTML = groupAContent
            groupBDiv.innerHTML = groupBContent
            groupCDiv.innerHTML = groupCContent
            groupDDiv.innerHTML = groupDContent
            groupEDiv.innerHTML = groupEContent
            groupFDiv.innerHTML = groupFContent
            groupGDiv.innerHTML = groupGContent
            groupHDiv.innerHTML = groupHContent

        }


        // allHighlightsDiv.innerHTML = allHighlightscontent
        // collectedForYouDiv.innerHTML = collectedForYouContent
        // signLanguageDiv.innerHTML = signLanguageContent
    }
    logData()
