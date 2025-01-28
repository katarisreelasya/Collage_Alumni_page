export const emailTextFriendAdded = (
    alumniName: string,
    jntu_id: string,
    friendName: string,
    friendJntuId: string
  ): string => {
    return `
    Dear ${friendName}, 
  
    We are excited to inform you that ${alumniName} (JNTU ID: ${jntu_id}) has added you as a friend on the GMRIT Alumni Network! It's always great to reconnect with fellow alumni and expand your professional and personal network.
  
    Remember the good times and experiences you shared with ${alumniName}? Now is the perfect opportunity to strengthen your connection and continue building your network. Whether it's sharing advice, collaborating on projects, or just staying in touch, the GMRIT Alumni Network is here to help you grow and maintain meaningful connections.
  
    Here are the details of the new friend request:
  
    Alumni Name: ${alumniName} 
    Alumni's JNTU ID: ${jntu_id}  
  
    We encourage you to log in to your alumni account and start connecting with other members, including ${alumniName}, to explore the many benefits our alumni network has to offer.
  
    Steps to Connect and Build Your Network:
    1. Log in to your alumni account using your credentials (Login ID: ${friendJntuId}).
    2. Visit ${alumniName}'s profile and explore shared interests and professional expertise. 
    3. Don't hesitate to reach out and send a message or schedule a meeting with ${alumniName}. 
    
    Please remember that building your alumni network is a great way to stay connected, support one another, and create new opportunities within the GMRIT community.
  
    If you have any questions or need assistance with your account, feel free to contact our support team at [Support Email].
  
    Best regards,
    GMRIT Alumni Network Team
    [Contact Information]
    `;
  };
  