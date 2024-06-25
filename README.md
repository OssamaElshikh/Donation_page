 # How to run the project on your local host


.. Clone the repository:


git clone https://github.com/OssamaElshikh/Donation_page.git

cd Donation_page



.. Install backend dependencies:


cd server

npm install



.. Install frontend dependencies:


cd ../client

npm install




.. Start the backend server:


cd ../server

npm start

.. Start the frontend server:

cd ../client

npm run dev




if you encountered any issues the tsconfig.json should look like this :
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}


Have fun ! :)


