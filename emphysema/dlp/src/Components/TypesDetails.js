import React from 'react'
import ce from '../images/centrilobular.png'
import pa from '../images/paraseptal.png'
import pe from '../images/panlobular.png'

const TypesDetails = () => {
    return (
        <div className='type-details'>
            <div className='head-type'>
                <h2>Terminology</h2>
                <p>Emphysema is one of the entities grouped under the overarching term chronic obstructive pulmonary disease (COPD) and is best thought of primarily as a pathological rather than clinical entity. The Global Initiative for the Diagnosis, Management, and Prevention of Chronic Obstructive Lung Disease (GOLD) is explicit that patients present with COPD, rather than emphysema</p>
            </div>

            <h2 className='h2-type'>Types of Emphysema</h2>
            <div className='detail-grid'>
                <div className='img1 img-5'><img src={ce} className='ce-img img-type' /></div>
                <div className='CE'>
                    <h3 className='h-type'>Centrilobular emphysema</h3>
                    <p className='p-type'>Centrilobular is by far the most common type encountered and is a common finding in asymptomatic elderly patients. It is predominantly located in the upper zones of each lobe (i.e. apical and posterior segments of the upper lobes, and superior segment of the lower lobes) and has a patchy distribution 4. It appears as focal lucencies (emphysematous spaces) which measure up to 1 cm in diameter, located centrally within the secondary pulmonary lobule, often with a central or peripheral dot representing the central bronchovascular bundle</p>
                </div>
                <div className='img2 img-5'><img src={pe} className='pe-img img-type' /></div>
                <div className='PE'>
                    <h3 className='h-type'>Panlobular emphysema</h3>
                    <p className='p-type'>Panlobular emphysema is predominantly located in the lower lobes, has a uniform distribution across parts of the secondary pulmonary lobule, which are homogeneously reduced in attenuation.</p>
                </div>
                <div className='img3 img-5'><img src={pa} className='pa-img img-type' /></div>
                <div className='PA'>
                    <h3 className='h-type'>Paraseptal emphysema</h3>
                    <p className='p-type'>Paraseptal emphysema is located adjacent to the pleura and septal lines with a peripheral distribution within the secondary pulmonary lobule. The affected lobules are almost always subpleural and demonstrate small focal lucencies up to 10 mm in size.</p>
                </div>
            </div>
            <div className="head-type">
                <h3>Treatment and prognosis</h3>
                <p>Unfortunately, once lung tissue is lost, no regrowth occurs. Treatment is therefore supportive and aimed at preserving the remaining lung parenchyma. Interventions include:</p>
                <ul>
                    <li>smoking cessation</li>
                    <li>oxygen therapy (in chronic hypoxemia)</li>
                    <li>symptom and exacerbation control</li>
                    <li>pulmonary rehabilitation</li>
                </ul>
            </div>
        </div>

    )
}

export default TypesDetails