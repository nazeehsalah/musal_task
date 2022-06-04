echo '--------------Front-end Start--------------'
cd front-end
echo '--------------Installing Packages--------------'
npm install
echo '--------------Start Test--------------'
ng test --watch=false
echo '--------------Start Build production--------------'
ng build --prod
echo 'front end project dist on ./front-end/dist/front-end '
echo '--------------Backend Start--------------'
cd ../back-end
echo 'Installing Packages ..'
npm install
echo '--------------Start Back-end Test--------------'
npm run test
echo '--------------npm run dev--------------'
npm run dev