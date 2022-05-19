import React from 'react';

import { Adsense } from '../../src';

function App() {
  return (
    <>
      <div className="bg-gray-200 pb-16">
        <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20">
          <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                React Adsense
              </h2>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                A react component for Google Adsense
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="https://github.com/scttcper/react-adsense"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    GitHub
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="https://www.npmjs.com/package/@ctrl/react-adsense"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    NPM
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="-mt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Install</h3>
              <div className="mt-2 text-sm leading-5 text-gray-600 font-mono">
                <pre>
                  <code>npm install @ctrl/react-adsense</code>
                </pre>
              </div>
              <div className="mt-3 text-sm leading-5">
                <a
                  href="https://bundlephobia.com/result?p=@ctrl/react-adsense"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
                >
                  Check the bundle size on bundlephobia.com &rarr;
                </a>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Demo</h3>
            <div className="mt-2 text-sm leading-5 text-gray-600">
              <p>Adblock must be disabled</p>
              <div className="text-center adsbygoogle mt-2">
                <Adsense client="ca-pub-7640562161899788" slot="7259870550" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
