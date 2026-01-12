import React from 'react'

const userCard = (user) => {
  // console.log(user);
   if (!user) return null;
    const detail = user.user;
    
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
<figure className="w-full h-64 overflow-hidden">
  <img
    src={detail.photoUrl}
    alt={detail.name}
    className="w-full h-full object-cover"
  />
</figure>
 
  <div className="card-body">
    <h2 className="card-title">{detail.name}</h2>
    <p>{detail.gender}</p>
    <p>{detail.about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default userCard
