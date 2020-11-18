import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

const sendgridApiKey = functions.config().sendgrid.key;
sgMail.setApiKey(sendgridApiKey);

export const sendEmail = functions.firestore.document(`EmailNotification/{docId}`).onCreate(async (event: any) => {
  console.log(`event `, event);
  const data: any = event.data();
  
  
  const welcomeEmail: any = {
    to: data.email,
    from: 'example@gmail.com',
    templateId: '',
    dynamic_template_data: {
      firstName: data.firstName,
    },
  };
  return sendgridSendEmail(welcomeEmail);
});

export const shareEmail=functions.https.onCall(async(data,context)=>{
  console.log('Data ', data);
  
  // if(!context.auth){
  //   throw new functions.https.HttpsError('failed-precondition','User Must be login');
  // }
  
  const msg ={
    to:data.email,
    from:"example@gmail.com",
    templateId:'',
    dynamic_template_data:{
      recipeName:data.name,
      recipeImg:data.imagePath,
      recipeDescription:data.description,
    },
  }

  return sgMail.send(msg)
  .then((response:any[])=>console.log('Success in Sharing E-Mail: ',response))
  .catch((error:any)=> console.log('Error in Sharing: ',error));

});


function sendgridSendEmail(data: any): Promise<void> {
  console.log(`Sending email with data: `, data);
  return sgMail
    .send(data)
    .then((response: any[]) => console.log('Success sending email: ', response))
    .catch((error: any) => console.log('Error sending email: ', error));
}