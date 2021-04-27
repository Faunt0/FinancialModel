console.log('this is your log speaking: we have lift-off')
function range(start, stop) {
	var array = [];
	for (let i = start; i < stop; i++) {
		array.push(i);
	}
	return array;
};
// make a model that has scheduals for different inputs, to be combined later

const financialModel = Vue.createApp({
    data() {
        return {
            startkapitaal: 0,
            maandelijkebijdrage: 0,
            rendement: 0,
            looptijd: 0,
            doelvermogen: 0,
            inflatie: 0,
            positiefV: 0,
            negatiefV: 0,
            positiefVarray: [],
            negatiefVarray: [],
            gemiddeldArray: [],
            OIbedrag: 0,
            resultaatKapitaal: 0,
        }
    },
    computed: {
        totaleInleg() {
            return Number(this.startkapitaal) + Number(this.maandelijkebijdrage * 12 * this.looptijd)
        },
        nettoWinst() {
            return Number(this.resultaatKapitaal) - (Number(this.startkapitaal) + this.maandelijkebijdrage * 12 * this.looptijd)
        }
    },
    methods: {
        berekenStartKapitaal() {

            positiefVarray: [];
            negatiefVarray: [];
            gemiddeldArray: [];
            console.log('')

            // wordt redelijk lastig overigens
            this.resultaatKapitaal = this.doelvermogen
            for (let i = 0; i <= this.looptijd; i++) {
                console.log(this.resultaatKapitaal)
                // this.resultaatKapitaal = (this.resultaatKapitaal - (12*this.maandelijkebijdrage))*(1-(this.rendement - this.inflatie)/100)
                // this.resultaatKapitaal = (this.resultaatKapitaal - ((12*this.maandelijkebijdrage)*(1+((this.rendement - this.inflatie)/100))))*(1-((this.rendement - this.inflatie)/100))
                this.resultaatKapitaal = (this.resultaatKapitaal/(1+(this.rendement - this.inflatie)/100)) - 12*this.maandelijkebijdrage
            }
            this.resultaatKapitaal = Math.ceil(this.resultaatKapitaal)
            this.startkapitaal = this.resultaatKapitaal

            // reset inputs
        },
        berekenEindKapitaal() {

            positiefVarray: [];
            negatiefVarray: [];
            gemiddeldArray: [];
            console.log(' ')
            this.resultaatKapitaal = Number(this.startkapitaal);
            console.log(this.resultaatKapitaal)
            console.log((this.resultaatKapitaal + 12*this.maandelijkebijdrage))


            // kan makkelijker
            for (let i = 0; i < this.looptijd; i++) {
                this.resultaatKapitaal = (this.resultaatKapitaal + Number(12 * this.maandelijkebijdrage))*(1+(this.rendement - this.inflatie)/100)

                // console.log(`Resultaat Kapitaal: ${Math.floor(this.resultaatKapitaal)}\tpositief uitzicht: ${Math.floor(this.positiefVarray[this.positiefVarray.length-1])}\tNegatief Uitzicht: ${Math.floor(this.negatiefVarray[this.negatiefVarray.length-1])}`)
            }

            this.resultaatKapitaal = Math.round((Number(this.startkapitaal) + Number(12 * this.maandelijkebijdrage)*this.looptijd) * Math.pow(((1+(this.rendement - this.inflatie)/100)), this.looptijd));
            // console.log(Math.round((Number(this.startkapitaal) + Number(12 * this.maandelijkebijdrage)*this.looptijd) * Math.pow(((1+(this.rendement - this.inflatie)/100)), this.looptijd)))


            // moet nog nakijken of dit werkt naar behoren.
            for (let i = 0; i < this.looptijd; i++) {
                this.gemiddeldArray.push(Math.round((Number(this.startkapitaal) + (12 * this.maandelijkebijdrage)*i) * Math.pow(((1+(this.rendement - this.inflatie)/100)), i)))
                

                this.positiefVarray.push(Math.floor((Number(this.startkapitaal) + (12 * this.maandelijkebijdrage)*i) * Math.pow((1 + ((this.rendement - this.inflatie) + this.positiefV) / 100), i)))
                this.negatiefVarray.push(Math.floor((Number(this.startkapitaal) + (12 * this.maandelijkebijdrage)*i) * Math.pow(1 + ((this.rendement - this.inflatie) - this.negatiefV) / 100, i)))
                // beweegKapitaal = (beweegKapitaal + (12 * this.maandelijkebijdrage))*(1+((this.rendement - this.inflatie)/100))

                console.log(`Resultaat Kapitaal: ${Math.floor(this.gemiddeldArray[i])}\tpositief uitzicht: ${Math.floor(this.positiefVarray[i])}\tNegatief Uitzicht: ${Math.floor(this.negatiefVarray[i])}`)
            }
            // console.log(`Resultaat Kapitaal: ${Math.floor(this.gemiddeldArray[i])}\tpositief uitzicht: ${Math.floor(this.positiefVarray[i])}\tNegatief Uitzicht: ${Math.floor(this.negatiefVarray[i])}`)
                // console.log(`Resultaat Kapitaal: ${Math.floor(this.gemiddeldArray[i])}\tpositief uitzicht: ${Math.floor(this.positiefVarray[i])}\tNegatief Uitzicht: ${Math.floor(this.negatiefVarray[i])}`)
            // this.positiefVarray.push(Math.floor((this.resultaatKapitaal + (12 * this.maandelijkebijdrage)*(1+(this.rendement - this.inflatie + this.positiefV)/100))))
            // this.negatiefVarray.push(Math.floor((this.resultaatKapitaal + (12 * this.maandelijkebijdrage))*(1+(this.rendement - this.inflatie - this.negatiefV)/100)))
            // this.gemiddeldArray.push(Math.floor(this.resultaatKapitaal))
        },
        showchart() {
            document.getElementsByTagName('html')[0].style.overflow = 'visible';
	        var ctx = document.getElementById('myChart');
	        var chart = new Chart(ctx, {
	        	type: 'line',

	        	data: {
	        		labels: range(0, this.looptijd),
	        		datasets: [{
	        			label: 'Gemiddelde vooruitzicht [&euro;]',
	        			// backgroundColor: 'rgb(255, 99, 132)',
	        			borderColor: 'rgb(0, 150, 250)',
	        			data: this.gemiddeldArray
	        		}, {
	        			label: 'Positief vooruitzicht [&euro;]',
	        			// backgroundColor: 'rgb(255, 99, 132)',
	        			borderColor: 'rgb(190, 190, 190)',
	        			data: this.positiefVarray
	        		}, {
	        			label: 'Negatief vooruitzicht [&euro;]',
	        			// backgroundColor: 'rgb(255, 99, 132)',
	        			borderColor: 'rgb(0, 250, 100)',
	        			data: this.negatiefVarray
	        		}]
	        	},

	        	
                // options: {
                //     title: {
                //         display: true,
                //         text: "Test"
                //     },
                //     plugins: {
                //         zoom: {
                //             pan: {
                //                 enabled: true,
                //                 mode: 'x',
                //                 speed: 10,
                //                 threshold: 10
                //             },
                //             zoom: {
                //                 enabled: true,
                //                 mode: 'y'
                //             }
                //         }
                //     }
                // }
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,
            
                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'x',
                        
                        speed: 1
                    },
            
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,						
                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                    }
                }
	        });

	        // percentO2array = [];
	        // percentCO2array = [];
	        // percentN2array = [];


	        // This works
	        // var chart = new Chart(ctx, {
	        // 	// The type of chart we want to create
	        // 	type: 'line',

	        // 	// The data for our dataset
	        // 	data: {
	        // 		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	        // 		datasets: [{
	        // 			label: 'My First dataset',
	        // 			// backgroundColor: 'rgb(255, 99, 132)',
	        // 			borderColor: 'rgb(255, 99, 132)',
	        // 			data: [0, 10, 5, 2, 20, 30, 45]
	        // 		}]
	        // 	},

	        // 	// Configuration options go here
	        // 	options: {}
	        // });
            },  
        financePreload() {
            this.startkapitaal = 2000
            this.maandelijkebijdrage = 100
            this.rendement = 7
            this.looptijd = 10
            this.doelvermogen = 60000
            this.inflatie = 2
            this.positiefV = 2
            this.negatiefV = 2
            // this.OIbedrag = 0


            // this.startkapitaal = 10000
            // this.maandelijkebijdrage = 0
            // this.rendement = 7
            // this.looptijd = 10
            // this.doelvermogen = 60000
            // this.inflatie = 0
            // this.positiefV = 2
            // this.negatiefV = 2
            // this.OIbedrag = 0
        }
    }
}).mount('#financieelModel')