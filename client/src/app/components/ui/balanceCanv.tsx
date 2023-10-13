import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import formateDate from "../../utils/formateDate";
import Tooltip from "./toolTip";
import { getCurrentUserData } from "../../redux/users";
import { useAppSelector } from "../../redux/createStore";

const CANV_WIDTH = 1200;
const CANV_HEIGHT = 400;
const SLIDER_HEIGHT = 100;
const INNER_WIDTH = 2 * CANV_WIDTH;
const INNER_HEIGHT = 2 * CANV_HEIGHT;
const SLIDER_INNER_HEIGHT = 2 * SLIDER_HEIGHT;
const PY = 40;
const PX = 40;
const VIEW_HEIGHT = INNER_HEIGHT - 2 * PY;
const VIEW_WIDTH = INNER_WIDTH - 2 * PX;
const SLIDER_VIEW_HEIGHT = SLIDER_INNER_HEIGHT - 2 * PY;

const ROWS_COUNT = 5;
const MAIN_LINE_COLOR = "white";
const ASSIST_LINE_COLOR = "rgb(156 163 175)";

const BalanceCanv = ({ arr, info }) => {
    const { createdAt } = useAppSelector(getCurrentUserData());
    const depArr = [...arr];
    depArr.unshift([createdAt, 0]);
    const infoArr = [...info];
    const initialTooltipState = {
        x: "",
        y: "",
        info: {},
        balance: ""
    };
    const initialFixedSstate = {
        sToLeft: 0,
        sToRight: 0
    };
    infoArr.unshift({ begin: true, createdAt });
    const [mouseOver, setMouseOver] = useState<number[]>();
    const [toolTip, setTooltip] = useState(initialTooltipState);
    const [rect, setRect] = useState({ left: 300, right: 300 });
    const [mouseDown, setMouseDown] = useState(false);
    const [fixedS, setFixedS] = useState(initialFixedSstate);
    const canvRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const sliderRef = useRef<HTMLCanvasElement | null>(null);
    const sliderContextRef = useRef<CanvasRenderingContext2D | null>(null);
    useEffect(() => {
        const canvas = canvRef.current;
        const ctx = canvas && canvas.getContext("2d");
        contextRef.current = ctx; // contextRef это контекст канваса
        const canvasSlider = sliderRef.current;
        const ctxSlider = canvasSlider && canvasSlider.getContext("2d");
        sliderContextRef.current = ctxSlider; // sliderContextRef это контекст канваса
        if (ctxSlider === null || ctx === null)
            throw new Error("Could not get context");
        if (canvas && canvasSlider) {
            canvas.style.width = CANV_WIDTH + "px";
            canvas.style.height = CANV_HEIGHT + "px";
            canvas.width = INNER_WIDTH;
            canvas.height = INNER_HEIGHT;

            canvasSlider.style.width = CANV_WIDTH + "px";
            canvasSlider.style.height = SLIDER_HEIGHT + "px";
            canvasSlider.width = INNER_WIDTH;
            canvasSlider.height = SLIDER_INNER_HEIGHT;

            const [yMINslider, yMAXslider] = getMinMax(depArr);

            const scaleXslider = VIEW_WIDTH / (depArr.length - 1);
            const newInfoArr: any[] = [];
            const newArrFromSlider = depArr.filter((d, i) => {
                if (
                    i * scaleXslider > rect.left - 40 &&
                    i * scaleXslider < INNER_WIDTH - rect.right - 40
                ) {
                    newInfoArr.push(infoArr[i]);
                    return true;
                }
            });

            const scaleX = VIEW_WIDTH / (newArrFromSlider.length - 1);
            const [yMIN, yMAX] = getMinMax(newArrFromSlider);
            const scaleY = VIEW_HEIGHT / (yMAX - yMIN);

            const scaleYslider = SLIDER_VIEW_HEIGHT / (yMAXslider - yMINslider);

            const space = VIEW_HEIGHT / ROWS_COUNT;
            const spaceXslider = VIEW_WIDTH / depArr.length;
            const spaceX = VIEW_WIDTH / newArrFromSlider.length;
            const textSpace = (yMAX - yMIN) / ROWS_COUNT;
            const coords = [];
            const coordsSlider = [];

            makeXDates(ctx, spaceX, newArrFromSlider);

            makeHorizontAssists(ctx, yMAX, space, textSpace);

            makeLine(
                ctxSlider,
                yMINslider,
                scaleYslider,
                scaleXslider,
                coordsSlider,
                depArr
            );

            makeLine(ctx, yMIN, scaleY, scaleX, coords, newArrFromSlider);
            addRect(ctxSlider);
            makeXDates(ctxSlider, spaceXslider, depArr);
            makeVerticlalAssists(ctx, mouseOver);
            getInfo(ctx, mouseOver, coords, newInfoArr, newArrFromSlider);
        }
    }, [mouseOver, rect.left, rect.right, arr]);

    function makeVerticlalAssists(ctx, mouseOver) {
        ctx.beginPath();
        ctx.strokeStyle = ASSIST_LINE_COLOR;
        ctx.lineWidth = 1;

        if (mouseOver) {
            ctx.moveTo(mouseOver[0], INNER_HEIGHT - PY);
            ctx.lineTo(mouseOver[0], 0 + PY);
        }

        ctx.stroke();
        ctx.closePath();
    }
    function getInfo(ctx, mouseOver, coords, newInfoArr, newArrFromSlider) {
        if (mouseOver) {
            coords.forEach((coord, i) => {
                if (
                    mouseOver[0] > coord[0] - 20 &&
                    mouseOver[0] < coord[0] + 20 &&
                    mouseOver[1] > coord[1] - 20 &&
                    mouseOver[1] < coord[1] + 20
                ) {
                    ctx.beginPath();
                    ctx.strokeStyle = MAIN_LINE_COLOR;
                    ctx.fillStyle = "#48036F";
                    ctx.lineWidth = 7;
                    ctx.arc(coord[0], coord[1], 25, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();

                    if (newInfoArr[i]) {
                        setTooltip((prev) => ({
                            ...prev,
                            info: newInfoArr[i],
                            balance: newArrFromSlider[i][1]
                        }));
                    }
                }
            });
        }
    }
    function makeHorizontAssists(ctx, yMAX, space, textSpace) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = ASSIST_LINE_COLOR;
        ctx.font = "normal 30px serif";
        ctx.fillStyle = "white";
        for (let i = 1; i <= ROWS_COUNT; i++) {
            const y = space * i;
            const text = Math.round(yMAX - textSpace * i);
            ctx.fillText(text, 5, y + PY - 30);
            ctx.moveTo(0, y + PY);
            ctx.lineTo(INNER_WIDTH, y + PY);
        }
        ctx.stroke();
        ctx.closePath();
    }
    function makeXDates(ctx, spaceX, newArrFromSlider) {
        const actualArr =
            ctx === contextRef.current ? newArrFromSlider : depArr;

        const columns =
            ctx === contextRef.current
                ? 4 * (actualArr.length / depArr.length)
                : 4;

        const step = Math.round(actualArr.length / columns);
        ctx.beginPath();
        ctx.font = "normal 25px serif";
        ctx.fillStyle = "white";
        for (let i = 1; i < actualArr.length; i += step) {
            const x = spaceX * i;

            const text = formateDate(actualArr[i][0], true);

            ctx.fillText(
                text,
                x - 150,
                ctx === contextRef.current
                    ? INNER_HEIGHT - 10
                    : SLIDER_INNER_HEIGHT
            );
        }
        ctx.stroke();
        ctx.closePath();
    }
    function makeLine(ctx, yMIN, scaleY, scaleX, coords, depArr) {
        ctx.beginPath();
        ctx.lineWidth = ctx === contextRef.current ? 10 : 4;
        ctx.strokeStyle = MAIN_LINE_COLOR;
        depArr.forEach((d, i) => {
            const xLine = i * scaleX + PX;
            const yLine =
                (ctx === contextRef.current
                    ? INNER_HEIGHT
                    : SLIDER_INNER_HEIGHT) -
                (PY - yMIN * scaleY) -
                d[1] * scaleY;
            coords.push([xLine, yLine]);
            ctx.lineTo(xLine, yLine);
        });
        ctx.stroke();
        ctx.closePath();
    }
    function getMinMax(depArr) {
        let min;
        let max;
        for (const [, y] of depArr) {
            if (typeof min !== "number") min = y;
            if (typeof max !== "number") max = y;

            if (y < min) min = y;
            if (y > max) max = y;
        }
        return [min, max];
    }
    function addRect(ctxSlider) {
        ctxSlider.beginPath();
        ctxSlider.strokeStyle = "black";
        ctxSlider.fillStyle = ASSIST_LINE_COLOR;
        ctxSlider.lineWidth = 3;
        ctxSlider.filter = "opacity(40%)";
        ctxSlider.fillRect(0, PY / 2, rect.left, SLIDER_INNER_HEIGHT - PY); //left
        ctxSlider.fillRect(
            INNER_WIDTH - rect.right,
            PY / 2,
            rect.right,
            SLIDER_INNER_HEIGHT - PY
        );

        ctxSlider.moveTo(rect.left, SLIDER_INNER_HEIGHT);
        ctxSlider.lineTo(rect.left, 0);
        ctxSlider.moveTo(INNER_WIDTH - rect.right, SLIDER_INNER_HEIGHT);
        ctxSlider.lineTo(INNER_WIDTH - rect.right, 0);
        ctxSlider.stroke();
        ctxSlider.closePath();
    }

    function setCoords({ nativeEvent }) {
        setMouseDown(true);
        const { offsetX } = nativeEvent;
        const { left, right } = rect;
        const sX = offsetX * 2;

        if (sX > left && sX < INNER_WIDTH - right) {
            const rangeToLeftPoint = sX - left;
            const rangeToRightPoint = INNER_WIDTH - sX - right;
            setFixedS({
                sToLeft: rangeToLeftPoint,
                sToRight: rangeToRightPoint
            });
        }
    }

    function correctViewRect({ nativeEvent }) {
        if (!mouseDown) return;
        const { offsetX } = nativeEvent;
        const { left, right } = rect;

        const sX = offsetX * 2;

        if (sX <= left || sX >= INNER_WIDTH - right) {
            if (sX <= left && sX >= 0) {
                setRect((prev) => ({ ...prev, left: sX + 30 }));
            } else if (sX >= INNER_WIDTH - right && sX <= INNER_WIDTH) {
                setRect((prev) => ({
                    ...prev,
                    right: INNER_WIDTH - sX + 30
                }));
            }
        } else if (
            sX > left &&
            sX < INNER_WIDTH - right &&
            Object.keys(fixedS).length > 0
        ) {
            const { sToLeft, sToRight } = fixedS;
            const leftDream = sX - sToLeft;
            const rightDream = INNER_WIDTH - sX - sToRight;
            if (leftDream > 0 && rightDream > 0) {
                setRect({
                    left: leftDream,
                    right: rightDream
                });
            }
        }
    }
    function handleMoveOver({ nativeEvent }) {
        const { offsetX, offsetY, pageX, pageY } = nativeEvent;

        const correctX = pageX + 10;
        const correctY = pageY + 10;
        setTooltip((prev) => ({ ...prev, x: correctX, y: correctY }));

        setMouseOver([offsetX * 2, offsetY * 2]);
    }
    if (!arr.length)
        return (
            <div className="col-start-3 col-span-8 grid justify-center items-center p-4 mb-4">
                Здесь пока ничего нет
            </div>
        );
    return (
        <>
            <div className="col-start-3 col-span-8 grid justify-center items-center p-4 mb-4">
                <canvas
                    className="cursor-pointer"
                    onMouseMove={handleMoveOver}
                    onMouseLeave={() => {
                        setMouseOver([]);
                        setTooltip(initialTooltipState);
                    }}
                    ref={canvRef}
                ></canvas>
                <Tooltip
                    x={toolTip.x}
                    y={toolTip.y}
                    info={toolTip.info}
                    balance={toolTip.balance}
                />
            </div>
            <div className="cursor-grab active:cursor-grabbing col-start-3 col-span-8 grid justify-center items-center p-4  mb-24">
                <canvas
                    ref={sliderRef}
                    onMouseMove={correctViewRect}
                    onMouseDown={(e) => {
                        setMouseDown(true);
                        setCoords(e);
                    }}
                    onMouseLeave={() => {
                        setMouseDown(false);
                        setFixedS(initialFixedSstate);
                    }}
                    onMouseUp={() => {
                        setMouseDown(false);
                        setFixedS(initialFixedSstate);
                    }}
                ></canvas>
            </div>
        </>
    );
};

BalanceCanv.propTypes = {
    arr: PropTypes.arrayOf(PropTypes.array),
    info: PropTypes.arrayOf(PropTypes.object)
};

export default BalanceCanv;
