;; prints a numer in rsi
global writeNewLine
global writeNumber

extern writeCharacter

section .text


;; expects the number to fit in and be in r0
;; shamelessly borrowed from: http://stackoverflow.com/questions/13523530/printing-an-int-or-int-to-string
;; note the cleaner alternate SO solution seems like a func experiment
writeNumber:
	push	rax
	push	rdx
	
	xor	edx, edx
	div	qword [rel const10]	; rax = quotient, rdx = remainder
	test	rax, rax	; Is quotient zero?

	je	.endWriteNumber		; skip recursion

	call	writeNumber	; write the quotien

.endWriteNumber:
	lea	rax, [rdx + '0']
	mov	[rel buffer], byte rax 
	mov	rsi, buffer 
	call	writeCharacter  ; display the remainder

	pop	rdx
	pop	rax
	ret

writeNewLine:
	mov 	rsi, constSlashN
	call	writeCharacter
	ret

section .bss
default rel

buffer:	resb	1

section .data
default rel

const10:	dq	10
constSlashN:	db	10
