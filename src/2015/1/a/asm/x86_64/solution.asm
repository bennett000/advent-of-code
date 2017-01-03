global start

increment	equ	'('
decrement	equ	')'

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	;; External Procedures
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

extern exit
extern readCharacter
extern writeBuffer
extern writeCharacter
extern writeNewLine
extern writeNumber

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	;; Start Functionality
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

section .text

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	;; Main Loop
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

start:
	;; let r10 be floor = 0
	xor	r10, r10

	;; temporary register
	xor	r11, r11

	;; use for comparison
	mov	r12, increment
	mov	r13, decrement

startStdin:	
	mov	rsi, buffer	; not relevant if syscal preserves rsi
	call	readCharacter
	mov	r11, rax	; store the EOF result for later

	;; check for EOF
	cmp	rax, 0		; check for EOF
	je	endStdin	; stop reading

	;; setup for compare and inc/dec 
	mov	r14, [rel buffer] ; bring in the buffer to compare

	;; increment case
	cmp	r14, r12
	je	incrementFloor

	;; decrement case
	cmp	r14, r13
	je	decrementFloor

	;; unexpected data...
	jmp startStdin
	

endStdin:	
	mov	rsi, message
	mov	rdx, message.length
	call	writeBuffer
	
	mov	rax, r10
	call	writeNumber

	call	writeNewLine

	call	exit


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	;; Jump (instead of ret) Procedures
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

incrementFloor:
	add	r10, 1
	jmp	startStdin

decrementFloor:
	sub	r10, 1
	jmp	startStdin

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	;; Data & Memory
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

section .bss
default rel

buffer:	resb	1


section .data
default rel

message:	db	"Santa is on floor "
.length		equ	$ - message
