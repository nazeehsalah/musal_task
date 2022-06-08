echo '--------------Backend Start--------------'
cd back-end
echo 'Installing Packages ..'
npm install
echo '--------------Start Back-end Test--------------'
npm run test
echo '--------------npm run dev--------------'
npm run dev