import React, { useEffect, useRef, useState } from "react";
import CategoryToolTip from "./categoryToolTip";
const CANV_WIDTH = 400;
const CANV_HEIGHT = 400;
const INNER_WIDTH = 2 * CANV_WIDTH;
const INNER_HEIGHT = 2 * CANV_HEIGHT;
const P = 20;

interface ToolTip {
    x: null | number;
    y: null | number;
    info: object;
}

const StatCanv = ({ arr, categories }) => {
    const [mouseOver, setMouseOver] = useState<number[]>();
    const initialStateToolTip: ToolTip = {
        x: null,
        y: null,
        info: { part: "", name: "" }
    };
    const [toolTip, setToolTip] = useState(initialStateToolTip);
    const canvRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvRef.current;
        const ctx = canvas && canvas.getContext("2d");
        contextRef.current = ctx;
        if (canvas) {
            canvas.style.width = CANV_WIDTH + "px";
            canvas.style.height = CANV_HEIGHT + "px";
            canvas.width = INNER_WIDTH;
            canvas.height = INNER_HEIGHT;

            makeCircle(ctx, arr);
        }
    }, [mouseOver, arr]);
    function makeCircle(ctx, arr) {
        let start = 0;
        arr.forEach((part) => {
            ctx.beginPath();

            const circle = new Path2D();

            circle.arc(
                CANV_HEIGHT,
                CANV_HEIGHT,
                CANV_HEIGHT - P,
                start + 0.01 * part[0] * Math.PI,
                start + part[0] * 2 * Math.PI - 0.02 * part[0] * Math.PI,
                false
            );
            circle.lineTo(CANV_HEIGHT, CANV_HEIGHT);
            circle.closePath();

            if (mouseOver) {
                if (ctx.isPointInPath(circle, mouseOver[0], mouseOver[1])) {
                    setToolTip((prev) => ({
                        ...prev,
                        info: {
                            part: Math.round(part[0] * 100) + "%",
                            name: categories.find((c) => c.color === part[1])
                                .name
                        }
                    }));
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 5;
                    ctx.stroke(circle);
                }
            }

            ctx.fillStyle = part[1];

            ctx.fill(circle);

            start += part[0] * 2 * Math.PI;
        });

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 1;

        ctx.arc(CANV_HEIGHT, CANV_HEIGHT, 30, 0, 2 * Math.PI, false);

        ctx.stroke();
        ctx.fill();
    }
    function getCoords({ nativeEvent }) {
        const { offsetX, offsetY, pageX, pageY } = nativeEvent;
        setMouseOver([offsetX * 2, offsetY * 2]);
        setToolTip((prev) => ({ ...prev, x: pageX + 10, y: pageY - 10 }));
    }
    if (!arr.length)
        return (
            <div className="m-2 p-2 flex justify-center items-center">
                Здесь пока ничего нет
            </div>
        );
    return (
        <div className="m-2 p-2 flex justify-center items-center cursor-pointer">
            <canvas
                ref={canvRef}
                onMouseMove={getCoords}
                onMouseLeave={() => {
                    setMouseOver([]);
                    setToolTip(initialStateToolTip);
                }}
            ></canvas>
            <CategoryToolTip x={toolTip.x} y={toolTip.y} info={toolTip.info} />
        </div>
    );
};

export default StatCanv;
