import React from 'react';
import Image from '../images/lung.png'

const Introduction = () => {
    return (
        <div className='main-intro'>
            <p className='intro'>INTRODUCTION</p>
            <div className='intro-page'>
            <div className='right'>
                    <img src={Image} alt='Lung' className='img'/>
            </div>
                <div className='left'>
                    <p className='content'>Learning  about  Lung  Diseases  and  their characterization is  one of the
                        most interesting research  topics in recent years. With the various uses of medical images in
                        hospitals, pathologies, and diagnostic centers, the size of the medical image datasets is also
                        expanding expeditiously to capture the diseases in hospitals. Though a lot of research has been
                        done on this particular topic still  this  field  is  confusing  and  challenging.  There  are  lots  of
                        techniques  in  literature  to  classify  medical  images. The  main drawback  of traditional
                        methods  is the  semantic  gap that  exists between  the  low-level  visual  information  captured
                        by  imaging devices and high-level semantic information perceived by a human being. The
                        difficulty of querying and managing the large datasets leads  to  a  new  mechanism  called
                        deep  convolutional  neural network. Chronic Obstructive Pulmonary Disease (COPD) is a
                        prevalent respiratory disorder characterized by airflow limitation, often caused by emphysema.
                        Early detection and classification of emphysema severity play a crucial role in effective
                        treatment and management. Deep learning techniques have recently achieved an impressive
                        result  in  the  field  of  computer  vision  along  with  Medical Engineering. Our aim was to
                        determine whether participant-level emphysema pattern could predict impairment and
                        mortality when classified by using a deep learning method.</p>
                </div>
                
                
            </div>

        </div>
    )
}

export default Introduction