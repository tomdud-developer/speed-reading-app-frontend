import Tween from 'rc-tween-one';
import React from 'react';
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
Tween.plugins.push(BezierPlugin);

export default function PointerBasic2() {
  return (
    <div style={{ position: 'relative', height: 300 }}>
      <Tween
        animation={{
          bezier: {
            type: 'thru', autoRotate: true,
            vars: [ { x: 400, y: 0 }, { x: 0, y: 300 }, { x: 400, y: 300 }, { x: 0, y: 600 }, { x: 400, y: 600 }, { x: 0, y: 900 } ],
          },
          duration: 5000,
        }}
        style={{ width: 100 }}
      >
        <div style={{width: "40px", height: "40px", background: "#afa"}}></div>
      </Tween>
      <div
        style={{
          width: 5, height: 5, background: '#000',
          position: 'absolute', top: 0, transform: 'translate(200px,200px)',
        }}
      />
      <div
        style={{
          width: 5, height: 5, background: '#000', position: 'absolute',
          top: 0, transform: 'translate(400px,0px)',
        }}
      />
      <div
        style={{
          width: 5, height: 5, background: '#000', position: 'absolute',
          top: 0, transform: 'translate(600px,200px)',
        }}
      />
      <div
        style={{
          width: 5, height: 5, background: '#000', position: 'absolute',
          top: 0, transform: 'translate(800px,0px)',
        }}
      />
    </div>);
}