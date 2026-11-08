import React, { useState } from 'react'

const Userdetails = () => {
  const [showNewPage, setShowNewPage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showImage,setShowImage]=useState(false)

  const handleClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".png, .jpg, .jpeg"; // Limit accepted file types if needed
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleReset=()=>{
      setSelectedFile(null)
  }

  return (
    <div>
      <h3 className='details'>Enter Details</h3>
      <div>
        <form>
          <div className='container'>
            <div className='item1'>
              <p className='U-text'>User Name</p>
              <input type="text" name='Uname' className='Uname' placeholder='Enter your name...' required />
            </div>
            {/* <div className='item2'>
                  <p className='U-file'>Upload File</p>
                  <input type="file" id="fileInput" className="file-input" onChange={handleFileChange}/>
                  <label htmlFor="fileInput" className="file-label">Choose a file</label>
                  
                </div> */}
            <div className="item2">
            <p className='U-file'>Upload File</p>
              <div className="clickable-box file-label" onClick={handleClick}>
                {selectedFile?selectedFile.name:'choose File....'}
              </div>
              
              
            </div>
            {/* <div className='item3'><center><button className='submit' onSubmit={handleSubmitButton}>Submit</button></center></div> */}
          </div>
          {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Image"
                  className="selected-image"
                />
              )}
              {selectedFile && (
                <p className='predict'>Predection :It is a disease</p>
              )}
          <div><center><input type="reset" className=" submit" onClick={handleReset}/></center></div>
        </form>
      </div>
    </div>
  )
}

export default Userdetails